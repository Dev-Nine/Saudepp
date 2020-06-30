import React, { useEffect } from 'react';

import { Container } from '../styles';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

export default function FaqCovid19() {
   useEffect(() => {
      document.title = 'Dúvidas Frequentes';
   });

   return (
      <>
         <Header />
         <div className="main">
            <Container>
               <ul className="summary" />
               <ul className="faq">
                  <li id="section1">
                     <h2>1. O que é o coronavírus?</h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;Segundo a Organização Mundial da
                        Saúde (OMS), coronavírus é uma família de vírus que pode
                        causar doenças em animais ou humanos. Em humanos, esses
                        vírus provocam infecções respiratórias que podem ser
                        desde um resfriado comum até doenças mais severas como a
                        Síndrome Respiratória do Oriente Médio (MERS) e a
                        Síndrome Respiratória Aguda Grave (SARS). O novo
                        coronavírus causa a doença chamada COVID-19.
                     </p>
                  </li>
                  <li id="section2">
                     <h2>2. O que é COVID-19?</h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;COVID-19 é a doença infecciosa
                        causada pelo mais recente coronavírus descoberto. O
                        vírus e a doença eram desconhecidos antes do surto
                        iniciado em Wuhan, na China, em dezembro de 2019. Como
                        nunca tivemos contato com o vírus antes, não temos
                        imunidade contra ele.
                     </p>
                  </li>
                  <li id="section3">
                     <h2>3. Quais são os sintomas da COVID-19?</h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;Os sintomas mais comuns da
                        COVID-19 são febre, tosse seca e cansaço. Outros
                        sintomas menos comuns e que podem afetar alguns
                        pacientes incluem dores, congestão nasal, dor de cabeça,
                        conjuntivite, dor de garganta, diarreia, perda de
                        paladar ou olfato e erupção cutânea na pele ou
                        descoloração dos dedos das mãos ou dos pés. Esses
                        sintomas geralmente são leves e começam gradualmente.
                     </p>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;Algumas pessoas são infectadas,
                        mas apresentam apenas sintomas muito leves.
                     </p>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;A maioria das pessoas (cerca de
                        80%) se recupera da doença sem precisar de tratamento
                        hospitalar. Cerca de uma em cada cinco pessoas que
                        adquire COVID-19 fica gravemente doente e desenvolve
                        dificuldade em respirar. As pessoas idosas e as que têm
                        problemas médicos subjacentes, como pressão alta,
                        problemas cardíacos e pulmonares, diabetes ou câncer,
                        têm maior risco de desenvolver doenças graves. No
                        entanto, qualquer pessoa pode pegar o COVID-19 e ficar
                        gravemente doente.
                     </p>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;Pessoas de todas as idades que
                        apresentam febre e/ou tosse associada a dificuldade em
                        respirar, falta de ar, dor ou pressão no peito, perda de
                        fala ou movimento devem procurar atendimento médico
                        imediatamente. Se possível, é recomendável ligar
                        primeiro para o médico ou serviço de saúde, para que o
                        paciente possa ser encaminhado para a clínica certa.
                     </p>
                  </li>
                  <li id="section4">
                     <h2>4. Quão grave é a COVID-19?</h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;Algumas pessoas infectadas pelo
                        vírus podem não apresentar sintomas ou apresentar
                        sintomas discretos. A maioria das pessoas infectadas
                        (cerca de 80% ou mais) se recupera da doença sem
                        precisar de tratamento especial. Cerca de uma em cada
                        seis pessoas com COVID-19 pode desenvolvê-la em sua
                        forma mais grave. O tempo de recuperação varia e, para
                        pessoas que não estão gravemente doentes, pode ser
                        semelhante ao período de duração de uma gripe comum.
                        Pessoas que desenvolvem pneumonia podem levar mais tempo
                        para se recuperar (dias a semanas). Pessoas idosas
                        (principalmente acima de 70 anos) e as que apresentam
                        doenças crônicas – por exemplo: pressão alta, doenças
                        respiratórias crônicas, problemas cardíacos, diabetes,
                        problemas renais e pessoas com o sistema imunológico
                        comprometido, como as que estão em tratamento para
                        câncer – têm maior probabilidade de desenvolver doença
                        respiratória mais grave.
                     </p>
                  </li>
                  <li id="section5">
                     <h2>5. Como a COVID-19 é transmitida?</h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;As pessoas podem pegar a
                        COVID-19 de outras pessoas que têm o vírus. A doença se
                        espalha principalmente de pessoa para pessoa através de
                        pequenas gotas do nariz ou da boca, que são expelidas
                        quando uma pessoa com COVID-19 tosse, espirra ou fala.
                        Essas gotículas são relativamente pesadas, não se
                        espalham para muito longe e rapidamente se depositam nas
                        superfícies e chão. As pessoas podem se contaminar caso
                        respirem essas gotículas de uma pessoa infectada pelo
                        vírus. É por isso que é importante ficar a pelo menos um
                        metro de distância dos outros. Essas gotículas podem
                        pousar em objetos e superfícies ao redor da pessoa, como
                        mesas, maçanetas e corrimãos. As pessoas podem ser
                        infectadas ao tocar nesses objetos ou superfícies e
                        depois tocar nos olhos, nariz ou boca. Por isso é tão
                        importante lavar as mãos regularmente com água e sabão
                        ou limpar com álcool gel a 70.
                     </p>
                  </li>
                  <li id="section6">
                     <h2>
                        6. Pessoas sem sintomas podem transmitir o coronavírus?
                     </h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;A principal maneira pela qual a
                        doença se espalha é através de gotículas respiratórias
                        expelidas por alguém que está tossindo. O risco de
                        contrair COVID-19 de alguém sem sintomas é baixo. No
                        entanto, muitas pessoas com COVID-19 experimentam apenas
                        sintomas leves, isto é particularmente verdade nos
                        estágios iniciais da doença. Portanto, é possível
                        contrair COVID-19 de alguém que tenha, por exemplo,
                        apenas uma tosse leve e não se sinta doente, por
                        exemplo.
                     </p>
                  </li>
                  <li id="section7">
                     <h2>
                        7. Posso pegar a COVID-19 se tiver contato com fezes de
                        alguém com a doença?
                     </h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;O risco de pegar COVID-19 nas
                        fezes de uma pessoa infectada parece ser baixo. Embora
                        as investigações iniciais sugiram que o vírus possa
                        estar presente nas fezes em alguns casos, a disseminação
                        por essa via não é uma característica principal do
                        surto. Como isso é um risco, no entanto, é outro motivo
                        para limpar as mãos regularmente, depois de usar o
                        banheiro e antes de comer.
                     </p>
                  </li>
                  <li id="section8">
                     <h2>
                        8. Posso pegar o coronavírus comendo alimentos
                        preparados por outras pessoas?
                     </h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;Os coronavírus foram detectados
                        nas fezes de certos pacientes, portanto, atualmente não
                        podemos descartar a possibilidade de transmissão
                        ocasional de manipuladores de alimentos infectados.
                        Entretanto, podemos afirmar que o risco da transmissão
                        por alimentos contaminados poderá acontecer caso o
                        alimento tenha sido exposto à secreção respiratória de
                        uma pessoa contaminada. Se você tem dúvida, faça a
                        limpeza do alimento antes de consumi-lo. Para alimentos
                        cozidos, o risco seria muito menor. Para alimentos que
                        serão consumidos in natura, como folhas e frutas, a
                        higienização é feita como preconiza a segurança
                        alimentar: lavar em água corrente para retirar sujeiras,
                        parasitas e pequenos insetos e depois deixar de molho em
                        solução clorada por 15 minutos, em média. Só então
                        enxaguar em água corrente.
                     </p>
                  </li>
                  <li id="section9">
                     <h2>9. Produtos vindos da China podem conter o vírus?</h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;Provavelmente não. O Ministério
                        da Saúde não identificou evidência que produtos enviados
                        da China para o Brasil tragam o novo coronavírus. Assim,
                        não há razão para suspeitar que os pacotes da China
                        abrigam COVID-19. Lembre-se, este é um vírus
                        respiratório semelhante ao da gripe. Não paramos de
                        receber pacotes da China durante a temporada de gripe.
                        Devemos seguir a mesma lógica para esse novo patógeno.
                        Entretanto, é possível que o vírus possa estar viável em
                        superfícies frequentemente tocadas, como uma maçaneta de
                        porta por exemplo, embora informações precoces sugiram
                        que partículas virais provavelmente sobreviverão por
                        algumas horas, de acordo com a OMS. Assim, as medidas
                        preventivas pessoais, como lavar frequentemente as mãos
                        com água e sabão ou com um desinfetante à base de álcool
                        e limpar as superfícies frequentemente tocadas com
                        desinfetantes ou um spray de limpeza doméstico, são
                        altamente recomendáveis.
                     </p>
                  </li>
                  <li id="section10">
                     <h2>
                        10. Humanos podem ser contaminados por coronavírus por
                        fonte animal?
                     </h2>
                     <p>
                        &ensp;&ensp;&ensp;&ensp;Embora tenha havido um caso de
                        cachorro infectado em Hong Kong, até o momento não há
                        evidências de que cachorro, gato ou qualquer outro
                        animal de estimação possa transmitir a COVID-19. O
                        coronavírus se espalha principalmente por gotículas
                        produzidas quando uma pessoa infectada tosse, espirra ou
                        fala. Ainda, é recomendável que se evite contato direto
                        com animais selvagens e com superfícies em contato com
                        eles e se mantenham boas práticas de segurança alimentar
                        ao manusear carnes cruas.
                     </p>
                  </li>
               </ul>
            </Container>
         </div>

         <Footer />
      </>
   );
}
