// "use client";

// import React from "react";
// import styles from "./index.module.css";

// export default function PacienteDiario() {
//    return (
//       <div className={styles.container}>
//          <aside className={styles.sidebar}>
//             <ul className={styles.diarioLista}>
//                <li>
//                   <strong>01/08/2024</strong> <p>Diario</p>
//                </li>
//                <li>
//                   <strong>15/08/2024</strong> <p>Diario</p>
//                </li>
//                <li>
//                   <strong>20/08/2024</strong> <p>Diario</p>
//                </li>
//             </ul>
//          </aside>
//          <main className={styles.mainContent}>
//             <div className={styles.Diario}>
//                {/* <input
//                   type="text"
//                   placeholder="Título"
//                   className={styles.tituloInput}
//                />
//                <textarea
//                   placeholder="Escreva suas anotações aqui..."
//                   className={styles.textoArea}
//                /> */}

//                {/* <div className={styles.botoes}>
//                   <button className={styles.salvarButton}>Salvar</button>
//                   <button className={styles.cancelarButton}>Cancelar</button>
//                </div> */}
//             </div>
//          </main>
//       </div>
//    );
// }
"use cliente";

import { useState, useEffect } from "react";
import axios from "axios"; // para chamadas à API

import Image from "next/image";
import styles from "./index.module.css";

export default function DiarioPaciente({ dia_id }) {
   const [notas, setNotas] = useState([]);
   const [notaSelecionada, setNotaSelecionada] = useState(null);
   const [paciente, setPaciente] = useState(null);

   // Chamada à API para buscar as notas do paciente
   useEffect(() => {
      async function fetchNotas() {
         try {
            const response = await axios.get(`/diario/${dia_id}`);
            setNotas(response.data);
         } catch (error) {
            console.error("Erro ao buscar notas:", error);
         }
      }

      async function fetchPaciente() {
         try {
            const response = await axios.get(`/paciente/${pac_id}`);
            setPaciente(response.data);
         } catch (error) {
            console.error("Erro ao buscar paciente:", error);
         }
      }

      fetchNotas();
      fetchPaciente();
   }, [dia_id]);

   return (
      <div className={styles.container}>
         {/* Sidebar */}
         <aside className={styles.sidebar}>
            <h3>Notas do Diário</h3>
            <ul>
               {notas.map((nota) => (
                  <li
                     key={nota.dia_id}
                     onClick={() => setNotaSelecionada(nota)}
                  >
                     <p>{nota.dia_data}</p>
                     <p>{nota.conteudo.slice(0, 15)}...</p>{" "}
                     {/* Mostra os primeiros 20 caracteres */}
                  </li>
               ))}
            </ul>
         </aside>

         {/* Área de visualização */}
         <section className={styles.visualizacaoNota}>
            {notaSelecionada ? (
               <div className={styles.notaDetalhada}>
                  <header className={styles.notaHeader}>
                     {paciente && (
                        <>
                           <Image
                              src={paciente.foto}
                              alt={paciente.nome}
                              width={50}
                              height={50}
                              className={styles.fotoPaciente}
                           />
                           <div className={styles.informacoesPaciente}>
                              <h2>{paciente.usu_nome}</h2>
                              {/* tem que associar a tabela usuarios ou ja push of pacientes? */}
                              <p>{notaSelecionada.dia_data}</p>
                           </div>
                        </>
                     )}
                  </header>
                  <div className={styles.conteudoNota}>
                     <p>{notaSelecionada.conteudo}</p>
                  </div>
               </div>
            ) : (
               <p>Selecione uma nota para visualizar</p>
            )}
         </section>
      </div>
   );
}
