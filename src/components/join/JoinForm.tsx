"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { easeOut } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { branches, profiles, siteConfig, type ProfileId } from "@/lib/site";

type Status = "idle" | "sent";

/**
 * Membership request form. There is no backend yet: on submit it opens the
 * visitor's mail app with a pre-filled message to the community address.
 */
export function JoinForm() {
  const [profile, setProfile] = useState<ProfileId>("alumni");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setError("Merci de renseigner ton nom et une adresse e-mail valide.");
      form.reportValidity();
      return;
    }
    setError(null);
    const data = new FormData(form);
    const profileLabel = profiles.find((p) => p.id === profile)?.title ?? profile;
    const subject = `Rejoindre We.Connect — ${profileLabel}`;
    const body = [
      `Nom : ${data.get("name")}`,
      `E-mail : ${data.get("email")}`,
      `Téléphone : ${data.get("phone") || "—"}`,
      `Profil : ${profileLabel}`,
      `Branche : ${data.get("branch") || "—"}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  return (
    <div className="join">
      <fieldset className="profiles">
        <legend className="join-step">
          <span>01</span> Tu es…
        </legend>
        <div className="profiles-grid">
          {profiles.map((p, i) => (
            <motion.label
              key={p.id}
              className={`profile-card${profile === p.id ? " is-selected" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <input
                type="radio"
                name="profile"
                value={p.id}
                checked={profile === p.id}
                onChange={() => setProfile(p.id)}
                className="sr-only"
              />
              <Icon name={p.icon} className="icon-md" />
              <strong>{p.title}</strong>
              <span>{p.text}</span>
              <span className="profile-check" aria-hidden="true">
                <Icon name="check" className="icon-sm" strokeWidth={3} />
              </span>
            </motion.label>
          ))}
        </div>
      </fieldset>

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            className="join-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            role="status"
          >
            <motion.span
              className="join-success-icon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
            >
              <Icon name="check" className="icon-md" strokeWidth={3} />
            </motion.span>
            <h3>Ta messagerie s’est ouverte.</h3>
            <p>
              Il ne reste plus qu’à envoyer le message pré-rempli. Rien ne
              s’est ouvert ? Écris-nous directement à{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ou
              appelle le <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>.
            </p>
            <button type="button" className="btn btn-outline" onClick={() => setStatus("idle")}>
              <span className="btn-label">Modifier ma demande</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="join-form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <p className="join-step">
              <span>02</span> Présente-toi
            </p>
            <div className="form-grid">
              <Field name="name" label="Nom complet" required autoComplete="name" />
              <Field name="email" label="E-mail" type="email" required autoComplete="email" />
              <Field name="phone" label="Téléphone (facultatif)" type="tel" autoComplete="tel" />
              <div className="field">
                <select name="branch" id="branch" defaultValue="">
                  <option value="">Aucune / non concerné·e</option>
                  {branches.map((b) => (
                    <option key={b.slug} value={b.title}>
                      {b.title}
                    </option>
                  ))}
                </select>
                <label htmlFor="branch" className="is-fixed">
                  Branche Wecode
                </label>
              </div>
              <div className="field field-full">
                <textarea name="message" id="message" rows={4} placeholder=" " />
                <label htmlFor="message">Ton message (facultatif)</label>
              </div>
            </div>
            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}
            <div className="form-foot">
              <button type="submit" className="btn btn-blue">
                <span className="btn-label">Envoyer ma demande</span>
                <span className="btn-arrow" aria-hidden="true">
                  <Icon name="arrow" className="btn-arrow-icon" strokeWidth={2.2} />
                  <Icon name="arrow" className="btn-arrow-icon" strokeWidth={2.2} />
                </span>
              </button>
              <p className="form-note">
                L’envoi ouvre ton application de messagerie avec un message
                pré-rempli.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="field">
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
      />
      <label htmlFor={name}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
    </div>
  );
}
