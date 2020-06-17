import styled from 'styled-components'

export const Container = styled.div`
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .content{
        width: 100%;
        max-width: 880px;
        height: 600px;
        margin-top: 60px;
        border-radius: 8px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        background: #F9F7F7;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form{
        width: 100%;
        max-width: 800px;
        height: 550px;
        background: #ffffff;
        display: flex;
        padding: 0 40px;
        align-items: center;
        border-radius: 8px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .form form p{
        font-size: 20px;
        margin-bottom: 10px;
        color: black;
    }

    .form form input{
        display: block;
        width: 700px;
        height: 47px;
        margin-bottom: 20px;
        border-radius: 8px;
        border: 1px;
        padding: 0 10px;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25)

    }

    .form form textarea{
        display: block;
        width: 700px;
        height: 200px;
        padding:0 10px;
        margin: 0 auto;
        border-radius: 8px;
        resize: none;
        border: 1px;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25)
    }

    .button-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex-wrap: wrap;
        margin-top: 10px;
    }

    .button1 button{
        margin-right: 20px;
        width: 145px;
        height: 37px;
        border: 1px;
        border-radius: 8px;
        background: #77C6FF;
        color: #ffffff;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0px 4px 1px #6FA9D3;
        transition: filter 0.2s;
    }

    .button1 button:hover{
        filter: brightness(90%);
    }

    .button2 button{
        width: 145px;
        height: 37px;
        border: 1px;
        border-radius: 8px;
        background: #77C6FF;
        color: #ffffff;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0px 4px 1px #6FA9D3;
        transition: filter 0.2s;
    }

    .button2 button:hover{
        filter: brightness(90%);
    }

    @media(max-width: 700px){


        .content{
            width: 100%;
            max-width: 1000px;
            height: 600px;
        }

        .form{
            width: 100%;
            max-width: 800px;
            height: 700px;
        }

        .form form input{
            width: 280px;
        }

        .form form textarea{
            width: 280px;
        }
        .button-container{
            display: flex;
            align-items: center;
        }
        .button1 button{
            display: block;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        .button2 button{
            display: block;
            
        }
    }
`