"use client";

import { useState } from "react";
import { steps } from "./../steps";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "./../schema";
import FinancialResult from "./FinancialResult";
import ErrorMessage from "./ErrorMessage";

export default function MultiStepForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      country: "",
      income: 0,
      monthlyExpenses: 0,
      monthlyDebtPayment: 0,
      totalDebt: 0,
      remainingInstallments: 0,
      savings: 0,
      financialGoal: "",
      mainObstacle: "",
      financialExperience: "",
    },
  });

  const currentStep = steps[stepIndex];
  const fieldName = currentStep.id as keyof FormData;
  const isLastStep = stepIndex === steps.length - 1;

  const onNext = () => {
    form.trigger(fieldName).then((valid) => {
      if (!valid) return;
      setStepIndex((prev) => prev + 1);
    });
  };

  const onBack = () => setStepIndex((prev) => prev - 1);

  const handleSubmit = () => {
    form.trigger(fieldName).then((valid) => {
      if (!valid) return;
      form.handleSubmit(onSubmit)();
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);

      const formattedData = {
        ...data,
        financialGoal:
          data.financialGoal === "Otro" && data.customGoal
            ? data.customGoal
            : data.financialGoal,
      };

      const response = await fetch("/api/financeAdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const json = await response.json();
      setResult(json);
      setSubmitted(true);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center max-w-3xl text-center text-xl">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-4">
          Bienvenido a Cashsen
        </h1>
        <p className="text-lg text-neutral-600 text-center max-w-xl mx-auto mb-6">
          Responde unas pocas preguntas y recibirás un plan personalizado que
          analiza tu situación financiera actual y te propone acciones claras
          para mejorar.
        </p>
        <p className="text-neutral-700 text-base space-y-1 text-left max-w-sm mx-auto mb-8">
          <span className="font-bold">✅ Entiende tu situación actual </span>{" "}
          <br />
          <span className="font-bold">
            🎯 Define un objetivo financiero claro{" "}
          </span>{" "}
          <br />
          <span className="font-bold">
            📈 Recibe un plan accionable al instante
          </span>{" "}
          <br />
        </p>
        <p className="text-sm text-neutral-500 italic mt-3 text-center">
          🔒 100% anónimo y sin necesidad de registrarte.
        </p>
        <p className="text-sm text-neutral-500 text-center italic max-w-md mx-auto mb-6">
          ✨ Esta es la primera versión de Cashsen: un diagnóstico rápido que te
          ayuda a entender tu situación financiera y qué hacer para mejorar.
          <br />
          🛠️ ¡Estamos construyendo más funciones! Tu opinión es clave para lo
          que viene.
        </p>
        <div className="flex items-center gap-2 mt-5">
          <button
            onClick={() => setStarted(true)}
            className="px-4 py-3 text-xl font-bold text-white transition-colors bg-black rounded-md shadow outline-none hover:bg-neutral-800 focus:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-300"
          >
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  if (submitted && result) {
    return <FinancialResult result={result} />;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-xl text-neutral-700">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        Generando tu plan financiero personalizado...
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Servicio saturado"
        message="Hemos alcanzado el límite de solicitudes permitidas. Por favor, intenta de nuevo en unos minutos."
        retry={() => {
          setStarted(false);
          setError(false);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-screen-md px-5 text-xl">
      {/* Barra de progreso */}
      <div className="w-full bg-neutral-200 rounded-full h-2 mb-8 overflow-hidden">
        <div
          className="bg-indigo-600 h-full transition-all duration-500"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-10">
          <div className="relative">
            {/* Número y flecha del paso */}
            <div className="absolute flex items-center gap-1 text-indigo-800 top-1 -left-8">
              <span>{stepIndex + 1}</span>
              <svg height="10" width="11" fill="currentColor">
                <path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path>
                <path d="M8 4v2H0V4z"></path>
              </svg>
            </div>

            {/* Título y ayuda del paso */}
            <label
              htmlFor={currentStep.id}
              className="text-xl font-medium text-indigo-800"
            >
              {currentStep.label} <span>*</span>
            </label>
            {currentStep.helptext && (
              <p className="mt-1 text-lg text-neutral-500">
                {currentStep.helptext}
              </p>
            )}

            {/* Campo dinámico */}
            {<currentStep.component {...currentStep} />}

            {/* Errores */}
            {form.formState.errors[fieldName] && (
              <div className="inline-flex items-center px-2 py-px mt-3 text-sm text-red-600 bg-red-100 rounded">
                {form.formState.errors[fieldName]?.message as string}
              </div>
            )}

            {/* Navegación */}
            <div className="flex items-center gap-2 mt-5">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={onBack}
                  className="font-medium text-neutral-700"
                >
                  ← Atrás
                </button>
              )}
              {!isLastStep ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-4 py-3 text-xl font-bold text-white bg-black rounded-md hover:bg-neutral-800"
                >
                  Siguiente →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-3 text-xl font-bold text-white bg-black rounded-md hover:bg-neutral-800"
                >
                  Enviar
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
