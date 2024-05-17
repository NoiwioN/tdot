"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";
import InsertWichtel from "./InsertWichtel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WichtelsAPI from "@/lib/api/Wichtels";

export default function WichtelCreateForm({ wichtel, session }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: wichtel ? wichtel.name : "",
    url: wichtel ? wichtel.url : "",
    maxPrice: wichtel ? wichtel.max_price : "",
    private: wichtel ? wichtel.is_private : false,
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    maxPrice: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({ ...formData, url: generateUrl(formData.name) });
  }, [formData.name]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let errorsLocal = {
      name: "",
      maxPrice: "",
    };

    if (formData.name === "") {
      errorsLocal.name = "Name muss ausgefüllt werden.";
    }

    if (formData.maxPrice === "") {
      errorsLocal.maxPrice = "Maximaler Preis muss ausgefüllt werden.";
    }

    setErrors(errorsLocal);

    if (errorsLocal.name || errorsLocal.maxPrice) {
      return;
    }

    const wichtelPost = {
      wichtel_id: wichtel ? wichtel.id_wichtel : null,
      name: formData.name,
      url: formData.url === "" ? generateUrl(formData.name) : formData.url,
      maxPrice: parseInt(formData.maxPrice, 10),
      is_private: formData.private,
      password: formData.password === "" ? null : formData.password,
    };

    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          if (wichtel) {
            console.log(wichtelPost);
            console.log(session.accessToken);
            const res = await WichtelsAPI.updateWichtel(
              wichtelPost,
              session.accessToken
            )
              .then(() => {
                return { success: true };
              })
              .catch((err) => {
                return { success: false, error: err };
              });

            if (res.success) {
              resolve();
              router.push("/wichtel/" + wichtelPost.url);
            } else {
              console.error(res.error);
              reject(res.error);
            }
            return;
          }
          const res = await InsertWichtel(wichtelPost);
          if (res.success) {
            resolve();
            router.push("/wichtel/" + wichtelPost.url);
          } else {
            console.error(res.error);
            reject(res.error);
          }
        } catch (err) {
          const responseBody = await err.response.json();
          reject(responseBody.message); // Reject with the error message
        }
      });

    // Display toast with loading message while promise is pending
    toast.promise(promise, {
      loading: `Wichtel wird ${wichtel ? "aktualisiert" : "erstellt"}...`,
      success: () => {
        return `Wichtel wurde erfolgreich ${
          wichtel ? "aktualisiert" : "erstellt"
        }!`;
      },
      error: (err) => {
        return `${
          wichtel ? "Aktualisierung" : "Erstellung"
        } fehlgeschlagen: ${err}`;
      },
    });
  }

  // Function to generate a url from the name
  function generateUrl(url) {
    return url
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col form-item w-full">
            <input
              className={
                "bg-background" +
                (errors.name ? " border-error" : " border-text")
              }
              type="text"
              autoComplete="off"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label
              className={
                "text font-normal " + (formData.name != "" ? "up" : "")
              }
              htmlFor="name"
            >
              Name
            </label>
          </div>
          <Popover>
            <PopoverTrigger>
              <Icon path={mdiInformationOutline} size={1} className="ms-1.5" />
            </PopoverTrigger>
            <PopoverContent side="right" align="center" sideOffset="1">
              Du kannst deinem Wichtel einen Namen geben. Dieser Name wird dann
              bei den Informationen angezeigt und kann für Suchen genutzt
              werden.
            </PopoverContent>
          </Popover>
        </div>
        <span className="mt-1 ms-0.5 text-sm text text-error">
          {errors.name}
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-full form-item">
            <input
              className={"bg-background border-text"}
              type="text"
              autoComplete="off"
              name="url"
              id="url"
              value={formData.url}
              onChange={handleInputChange}
            />
            <label
              className={"text font-normal " + (formData.url != "" ? "up" : "")}
              htmlFor="url"
            >
              URL
            </label>
          </div>
          <Popover>
            <PopoverTrigger>
              <Icon path={mdiInformationOutline} size={1} className="ms-1.5" />
            </PopoverTrigger>
            <PopoverContent side="right" align="center" sideOffset="1">
              Du kannst deinem Wichtel eine benutzerdefinierte URL geben. Wenn
              du keine angibst, wird automatisch eine vom Namen generiert.
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col mt-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-full form-item">
            <input
              className={
                "bg-background" +
                (errors.maxPrice ? " border-error" : " border-text")
              }
              type="number"
              autoComplete="off"
              name="maxPrice"
              id="maxPrice"
              value={formData.maxPrice}
              onChange={handleInputChange}
              onKeyDown={(e) =>
                ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
              }
            />
            <label
              className={
                "text font-normal " +
                (formData.maxPrice.toString().length > 0 ? "up" : "")
              }
              htmlFor="maxPrice"
            >
              Maximum Geschenk Preis
            </label>
          </div>
          <Popover>
            <PopoverTrigger>
              <Icon path={mdiInformationOutline} size={1} className="ms-1.5" />
            </PopoverTrigger>
            <PopoverContent side="right" align="center" sideOffset="1">
              Du kannst einen maximalen Preis für das Geschenk angeben. Dieser
              Preis wird dann bei den Teilnehmern als Richtwert angezeigt.
            </PopoverContent>
          </Popover>
        </div>
        <span className="mt-1 ms-0.5 text-sm text text-error">
          {errors.maxPrice}
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <input
            className="h-4 w-4 appearance-none border-white border-2 rounded-sm cursor-pointer checked:!accent-text checked:appearance-auto checked:text-textDark"
            type="checkbox"
            autoComplete="off"
            name="private"
            id="private"
            checked={formData.private}
            onChange={() =>
              setFormData({ ...formData, private: !formData.private })
            }
            style={{ backgroundColor: "transparent" }}
          />
          <label className="text font-normal ms-1.5 mt-1" htmlFor="private">
            Privat
          </label>
          <Popover>
            <PopoverTrigger>
              <Icon
                path={mdiInformationOutline}
                size={1}
                className="ms-1.5 mt-0.5"
              />
            </PopoverTrigger>
            <PopoverContent side="right" align="center" sideOffset="1">
              Wichtel können auf Privat gestellt werden um nicht bei Suchen
              aufzutauchen. Nur Personen mit dem direkten Link können dann
              diesen Wichtel auffinden.
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col relative mt-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-full form-item relative">
            <input
              className={"bg-background border-text"}
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label
              className={
                "text font-normal " + (formData.password !== "" ? "up" : "")
              }
              htmlFor="password"
            >
              Passwort <span className="text-muted ms-1">(Optional)</span>
            </label>
            <FontAwesomeIcon
              className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <Popover>
            <PopoverTrigger>
              <Icon path={mdiInformationOutline} size={1} className="ms-1.5" />
            </PopoverTrigger>
            <PopoverContent side="right" align="center" sideOffset="1">
              Du kannst dein Wichtel mit einem Passwort schützen um unbefugten
              Zugang zu verhindern.
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="w-full mt-1">
        <button
          className="btn btn-primary w-full flex justify-center"
          type="submit"
        >
          {wichtel ? "Aktualisieren" : "Erstellen"}
        </button>
      </div>
    </form>
  );
}
