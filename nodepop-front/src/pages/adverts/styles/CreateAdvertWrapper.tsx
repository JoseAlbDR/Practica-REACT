import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;

  h4 {
    margin-bottom: 2rem;
    text-align: center;
  }

  .form-center {
    display: grid;
    align-items: center;
    gap: 1rem;
  }

  .form-btn {
    margin-top: 2rem;
    align-self: end;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-tags {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: var(--border-radius);

    label {
      text-transform: capitalize;
    }
  }

  .input-check {
    margin-right: 0.5rem;
    padding-right: 0.5rem;
  }

  input[type='checkbox'] {
    background-color: green;
  }

  select {
    text-transform: capitalize;
  }

  @media (width > 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }

    @media (width > 1120px) {
      .form-center {
        grid-template-columns: repeat(3, 1fr);
      }

      .password-rows {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
          'old new repeat'
          'submit . .';
      }
    }
  }
`;

export default Wrapper;
