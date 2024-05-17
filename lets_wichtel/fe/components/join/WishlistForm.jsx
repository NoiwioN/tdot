import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WishlistForm({
  formData,
  setFormData,
  setPage,
  handleSubmit,
  session,
  maxPrice,
}) {
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmitLocal(e) {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <form onSubmit={handleSubmitLocal} className="mt-4 flex flex-col gap-3">
      <div className="flex flex-col">
        <p className="text">
          Hinweis: Du kannst deine Wunschliste jederzeit anpassen.
        </p>
        <p className="text mt-2">
          Der Richtwert für deine Geschenke liegt bei CHF {maxPrice}
        </p>
        <div className="flex flex-col form-item mt-4">
          <textarea
            className={"bg-background border-text"}
            type="text"
            name="wishlist"
            autoComplete="off"
            id="wishlist"
            value={formData.wishlist}
            onChange={handleInputChange}
            rows={6}
          />
          <label
            className={
              "text font-normal " + (formData.wishlist !== "" ? "up" : "")
            }
            htmlFor="wishlist"
          >
            Wunschliste
          </label>
        </div>
      </div>
      {session ? (
        <div className="w-full mt-1">
          <button
            className="btn btn-primary w-full flex justify-center"
            type="submit"
          >
            Fertig
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-row gap-3">
          <button
            className="btn px-3.5 flex justify-center bg-transparent border-2 border-muted text-muted hover:text-textDark hover:border-text hover:bg-text"
            type="button"
            onClick={() => setPage(2)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
          </button>
          <button
            className="btn btn-primary w-full flex justify-center"
            type="submit"
          >
            Fertig
          </button>
        </div>
      )}
    </form>
  );
}
