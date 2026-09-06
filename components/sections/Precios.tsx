import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { precio } from "@/content/precio";

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

export function Precios() {
  return (
    <section className="band band--tight" id="precios">
      <div className="wrap">
        <div className="head">
          <h2>{precio.titulo}</h2>
          <p className="lede">{precio.apoyo}</p>
        </div>

        <div className="plans">
          {precio.planes.map((plan) => (
            <article className={`plan${plan.destacado ? " plan--pick" : ""}`} key={plan.nombre}>
              <div className="plan__top">
                <h3>{plan.nombre}</h3>
                {"badge" in plan && plan.badge && <span className="plan__badge">{plan.badge}</span>}
              </div>
              <div className="plan__price">
                <span className={`plan__amt${plan.periodo === null ? " plan__amt--word" : ""}`}>{plan.monto}</span>
                {plan.periodo && <span className="plan__per">{plan.periodo}</span>}
              </div>
              <p className="plan__for">{plan.para}</p>
              <ul>
                {plan.incluye.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
              <HomeCtaLink
                href={plan.cta.href}
                section="precios"
                label={plan.cta.label}
                className={`btn btn--block ${plan.destacado ? "btn--primary" : "btn--secondary"}`}
              />
            </article>
          ))}
        </div>
        <p className="plans__note">{precio.notaMeta}</p>
      </div>
    </section>
  );
}
