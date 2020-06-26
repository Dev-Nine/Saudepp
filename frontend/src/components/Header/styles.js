import styled from 'styled-components'

export const Container = styled.div`
    /* mobile e desktop */
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
    div {
        max-width: 1300px;
        margin: 0 auto;
    }

    .menu{
        display: flex;
        transition: padding 1s;
    }

    .menu-logo{
        padding: 0 10px;
	text-decoration: none;
    }

    .menu-logo a{
        font-size: 28px;
        font-weight: bold;
        text-decoration: none;
        color: #0094DE;
    }

    .menu-logo p{
        font-weight: bold;
        color: black;
    }

    .icon {
        cursor: pointer;
    }

    /* desktop */
    @media only screen and (min-width: 1100px){

        .menu{
            padding: 10px 10px;
            max-width: 100%;
            flex-wrap: wrap;
            
        }

        nav {
            display: flex;
            flex-grow: 1;
            align-items: center;
            justify-content: space-around;
            
        }

        nav a {
            text-align: center;
            width: 110px;
            font-size: 18px;
            font-weight: bold;
            color: #0094DE;
            text-decoration: none;
            margin: 0 10px;
            transition: filter 0.2s;
            
        }
        
	nav a:hover{
            filter: brightness(80%);
        }

        img {
            border-radius: 100%;
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        .icon {
            display: none;
        }
    }
    /* mobile */
    @media only screen and (max-width: 1099px){

        div {
            margin: 0 0;
        }

        .menu{
            padding: 10px 40px;
        }

        nav {
            position: absolute;
            transform: scale(1, 0);
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            background-color: #fff;
            right: 30px;
            top: 72px;
            z-index: 20;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 0 0 8px 8px;
        }

        nav a {
            font-size: 18px;
            font-weight: bold;
            color: #0094DE;
            text-decoration: none;
            padding: 15px 30px;
        }

        img {
            display: none;
        }

        .icon {
            align-self: center;
            margin-left: auto;
        }

        .show-dropdown{
            animation: show-dropdown 0.6s forwards
        }

        .show-dropdown-back{
            animation: show-dropdown-back 0.6s forwards;
        }

        @keyframes show-dropdown {
            0%   {transform: scale(1, 0); top: -35px;}
            100%  {transform: scale(1, 1);}
        }

        @keyframes show-dropdown-back {
            0%   {transform: scale(1, 1);}
            100% {transform: scale(1, 0); top: -35px;}
        }
       
    }
`

