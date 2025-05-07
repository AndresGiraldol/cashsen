"use client";

type FinancialResultProps = {
  result: {
    nombre: string;
    introduccion: string;
    diagnostico: string;
    plan: {
      intro: string;
      semana: string;
      mes: string;
      tresMeses: string;
    };
    ideas: string[];
    mensajeFinal: string;
  };
};

export default function FinancialResult({ result }: FinancialResultProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-white rounded shadow-xl shadow-indigo-100 text-neutral-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-neutral-900 mb-2 text-center">
        Tu plan financiero personalizado
      </h1>

      <h2 className="text-3xl font-bold text-indigo-800 mb-6">
        {result.nombre}
      </h2>

      {/* Introducción */}
      <p
        className="text-lg mb-8 text-justify"
        dangerouslySetInnerHTML={{ __html: result.introduccion }}
      ></p>

      {/* Diagnóstico */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-indigo-700 mb-3">
          🧠 ¿Dónde estás parado ahora?
        </h2>
        <p
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: result.diagnostico }}
        ></p>
      </section>

      {/* Plan */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-indigo-700 mb-3">
          🎯 ¿Qué puedes hacer esta semana, este mes y en 3 meses?
        </h2>

        <p
          className="mb-8 text-justify"
          dangerouslySetInnerHTML={{ __html: result.plan.intro }}
        ></p>

        <ul className="space-y-5">
          <li>
            <strong>📅 Esta semana:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{ __html: result.plan.semana }}
            ></span>
          </li>
          <li>
            <strong>🗓️ Este mes:</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: result.plan.mes }}></span>
          </li>
          <li>
            <strong>📈 En 3 meses:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{ __html: result.plan.tresMeses }}
            ></span>
          </li>
        </ul>
      </section>

      {/* Ideas */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-indigo-700 mb-3">
          💡 Ideas para hacerlo más fácil
        </h2>
        <ul className="pl-5 space-y-3 text-neutral-800">
          {result.ideas.map((idea, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-justify leading-relaxed"
            >
              <span className="mt-1 text-indigo-500">✔️</span>
              <span dangerouslySetInnerHTML={{ __html: idea }}></span>
            </li>
          ))}
        </ul>
      </section>

      {/* Mensaje Final */}
      <div className="bg-indigo-100 text-indigo-900 text-center p-6 rounded font-medium italic mt-12">
        <div dangerouslySetInnerHTML={{ __html: result.mensajeFinal }}></div>
      </div>

      {/* Advertencia legal */}
      <div className="mt-10 text-sm text-neutral-500 text-center italic border-t pt-6">
        ⚠️ Esta herramienta es informativa y no reemplaza el consejo de un
        asesor financiero profesional.
      </div>

      {/* Retroalimentación */}
      <div className="mt-8 text-center">
        <p className="text-base text-neutral-700 mb-3 font-medium">
          🙋‍♀️ ¿Te sirvió este plan? Cuéntanos cómo podemos mejorarlo.
        </p>
        <a
          href="https://forms.gle/Pyrq2ea4JpcRN7PN6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block !bg-black text-white px-5 py-3 text-lg font-semibold rounded shadow hover:bg-neutral-800 transition-colors"
        >
          Déjanos tu opinión
        </a>
      </div>
    </div>
  );
}
