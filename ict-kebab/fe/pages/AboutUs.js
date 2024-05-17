import React, { useState } from 'react';
import styles from './AboutUs.module.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AboutUs(){
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e) => {
    e.preventDefault();


    const selectedDate = new Date(date);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please enter your feedback.");
      return;
    }

    if (selectedDate > today) {
      toast.error("The date cannot be in the future.");
      return;
    }

    toast.success("Feedback submitted successfully!");
    setEmail("");
    setName("");
    setFeedback("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
  <div className={styles.body}>
    <p className={styles.text}>
      Als Gründer von ICT-Kebab hatte Emre Dülger eine Vision; Er wollte das Essen seiner Heimat
      mit seinen Arbeitskollegen teilen. So entstand die Idee, einen Kebab-Imbiss zu eröffnen.
      Zusammen mit dem lokalen Chinesen haben sich Emre Dülger und Kay Herrmann an die Arbeit gemacht.
      Und am 1. März 2024 war es dann soweit: ICT-Kebab öffnete seine Türen. Um genauer zu sein, das
      Backend. Das war der erste Schritt für ICT-Kebab. Es sollte weitergehen mit der offiziellen Website
      von ICT-Kebab, doch leider fiel der Gründer, Emre Dülger, schwer krank. Doch Kay Herrmann, der lokale
      Chinese und Mitgründer konnte die Vision die ihm Emre Dülger gegeben hatte, weiterführen. Und so gründete er
      ein Entwicklerteam für ICT-Kebab und zusammen entwickelten Yannick Wolf, Dan Berger und Kay Herrmann
      die offizielle Website von ICT-Kebab.
    </p>
    <p className={styles.hiddenText}>https://www.youtube.com/watch?v=dQw4w9WgXcQ</p>
    <h2 className={styles.title}>Schick uns dein Feedback:</h2>
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Dein Name"
        required
        className={styles.input}
      />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Deine Email-Adresse"
        required
        className={styles.input}
      />
      <br />
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Dein Feedback"
        rows={4}
        cols={50}
        required
        className={styles.input}
      />
      <br />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className={styles.input}
      />
        <br />
      <button type="submit" onClick={handleSubmit} className={styles.button}>Feedback abschicken</button>
    </form>
  </div>
  );
};