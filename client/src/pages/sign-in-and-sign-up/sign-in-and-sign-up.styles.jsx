import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 800px){
    width:400px;
    align-items: center;
    display: grid;
    grid-gap:15px;
    padding-top:20px;
    margin: 20px auto;
    justify-content:unset;
  

  }
`;