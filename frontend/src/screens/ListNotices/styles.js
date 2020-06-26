import styled from 'styled-components';

export const ContainerPesquisa = styled.div`
    width: 70%;
    margin-bottom: 30px;
`

export const Search = styled.div`
    font-family: Roboto;
    font-style: normal;
    
    select {
	display: block;
	width: 30%;
	height: 36px;
	border-style: hidden;
    	border-radius: 10px;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    
	font-size: 15px;
	line-height: 28px;
	background-color: #FFFFFF;
    }

    option {
	font-size: 15px;
	line-height: 28px;
	background-color: #FFFFFF;
    }

`

export const ContainerNoticia = styled.div`
    background-color: #F9F7F7;
    padding: 15px 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;


    h1 {
     font-size: 30px;
     font-family: Roboto;
     font-style: normal;
     font-weight: bold
     color: #000000;
   }
    
   ul {
      margin-top: 15px;

      display: grid;
      grid-template-columns: repeat(4, minmax(200px, 300px));
      gap: 2rem;
      
      list-style: none;
   }

   li {
      background: #FFF;   
      border-radius: 8px;
   }

   @media (max-width: 1099px) {
      ul {
         grid-template-columns: repeat(1, 1fr);
      }
   }
`
