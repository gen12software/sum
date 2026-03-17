"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCog, 
  CreditCard, 
  FileCheck, 
  FileUp, 
  ChevronRight, 
  Send,
  Loader2,
  CheckCircle,
  X,
  CreditCard as CardIcon
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  formType: "contact" | "debit" | "payment" | "credential";
}

const TASKS: Task[] = [
  {
    id: "datos",
    title: "Actualizar Datos",
    description: "Modificá tu teléfono o email de contacto en nuestra base.",
    icon: <UserCog size={24} />,
    formType: "contact"
  },
  {
    id: "debito",
    title: "Adhesión a Débito",
    description: "Cargá tus datos para el cobro automático mensual.",
    icon: <CreditCard size={24} />,
    formType: "debit"
  },
  {
    id: "pago",
    title: "Informar Pago",
    description: "Subí tu comprobante de transferencia o depósito.",
    icon: <FileUp size={24} />,
    formType: "payment"
  },
  {
    id: "verificacion",
    title: "Estado de Afiliación",
    description: "Consultá la vigencia actual de tu plan médico.",
    icon: <FileCheck size={24} />,
    formType: "credential"
  }
];

export function AffiliateTasks() {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call to a specific endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setActiveTask(null);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-4 italic">
          Gestión <span className="text-secondary text-5xl">Autónoma</span>
        </h2>
        <p className="text-primary/60 font-medium max-w-xl mx-auto">
          Seleccioná la tarea que necesitás realizar. Cada formulario se procesa de forma inmediata en nuestro sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {TASKS.map((task) => (
          <motion.div
            key={task.id}
            layoutId={task.id}
            onClick={() => setActiveTask(task)}
            className="bg-surface p-8 rounded-4xl border border-border hover:border-secondary/20 hover:shadow-premium transition-all cursor-pointer group relative overflow-hidden flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border group-hover:scale-110 transition-transform">
                  <div className="text-secondary">{task.icon}</div>
               </div>
               <div>
                  <h3 className="text-xl font-bold text-primary mb-1 uppercase tracking-tight">{task.title}</h3>
                  <p className="text-sm font-medium text-primary/50">{task.description}</p>
               </div>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-border shrink-0 opacity-0 group-hover:opacity-100 transition-all">
               <ChevronRight size={18} className="text-secondary" />
            </div>
            <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-md"
          >
             <motion.div
                layoutId={activeTask.id}
                className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden"
             >
                <div className="bg-primary p-8 text-white relative">
                   <button 
                     onClick={() => setActiveTask(null)}
                     className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl transition-colors"
                   >
                     <X size={20} />
                   </button>
                   <div className="flex items-center gap-4 mb-2 text-secondary">
                      {activeTask.icon}
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Tarea Afiliado</span>
                   </div>
                   <h3 className="text-2xl font-black uppercase tracking-tight italic">{activeTask.title}</h3>
                </div>

                <div className="p-10">
                   {status === "success" ? (
                      <div className="py-12 text-center space-y-4">
                         <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                            <CheckCircle size={40} className="text-white" />
                         </div>
                         <h4 className="text-2xl font-black text-primary uppercase">¡Gestión Exitosa!</h4>
                         <p className="text-primary/60 font-medium italic">Tu solicitud ha sido recibida y se está procesando.</p>
                      </div>
                   ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                         {/* Common Identification Field */}
                         <div className="space-y-2 border-b border-border pb-6 mb-6">
                            <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Identificación Obligatoria</label>
                            <input 
                              type="text" 
                              placeholder="Número de Afiliado (ej: 12345/00)" 
                              className="w-full bg-surface border-2 border-secondary/20 p-4 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-black text-primary placeholder:text-primary/20" 
                              required 
                            />
                         </div>

                         {activeTask.formType === "contact" && (
                            <>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Nuevo Teléfono de Contacto</label>
                                  <input type="tel" placeholder="(221) 123-4567" className="w-full bg-surface border border-border p-4 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-bold text-primary" required />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Nuevo Email</label>
                                  <input type="email" placeholder="usuario@ejemplo.com" className="w-full bg-surface border border-border p-4 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-bold text-primary" required />
                               </div>
                            </>
                         )}

                         {activeTask.formType === "debit" && (
                            <>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">DNI del Titular</label>
                                  <input type="text" placeholder="DNI sin puntos" className="w-full bg-surface border border-border p-4 rounded-xl focus:ring-2 focus:ring-secondary/20" required />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Datos de Tarjeta o CBU</label>
                                  <div className="relative">
                                     <input type="text" placeholder="CBU (22 dígitos) o Nº Tarjeta" className="w-full bg-surface border border-border p-4 pl-12 rounded-xl focus:ring-2 focus:ring-secondary/20" required />
                                     <CardIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                                  </div>
                               </div>
                            </>
                         )}

                         {activeTask.formType === "payment" && (
                            <>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Importe de la Transferencia</label>
                                  <input type="number" placeholder="$ 0.00" className="w-full bg-surface border border-border p-4 rounded-xl focus:ring-2 focus:ring-secondary/20" required />
                               </div>
                               <div className="p-8 border-2 border-dashed border-border rounded-2xl text-center space-y-2 hover:border-secondary/20 transition-colors cursor-pointer bg-surface">
                                  <FileUp className="mx-auto text-secondary/40" size={32} />
                                  <p className="text-xs font-black text-primary/40 uppercase">Adjuntar Comprobante (PDF/JPG)</p>
                               </div>
                            </>
                         )}

                         {activeTask.formType === "credential" && (
                            <div className="space-y-4">
                               <p className="text-sm font-medium text-primary/70 leading-relaxed italic">
                                  Confirmá tu número para generar el token de validación de servicio.
                               </p>
                            </div>
                         )}

                         <button 
                           type="submit"
                           disabled={status === "loading"}
                           className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-3 disabled:opacity-50"
                         >
                            {status === "loading" ? (
                               <Loader2 className="animate-spin" size={20} />
                            ) : (
                               <>
                                 <Send size={18} />
                                 Confirmar Gestión
                               </>
                            )}
                         </button>
                      </form>
                   )}
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
