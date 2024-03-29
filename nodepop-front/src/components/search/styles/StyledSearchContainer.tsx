import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;

  .search-form {
    background: var(--background-secondary-color);
    padding: 3rem 2rem 4rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
  }

  h4 {
    margin-bottom: 2rem;
  }

  .btn-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-center {
    display: grid;
    align-items: center;
    gap: 1rem;
  }

  .form-row {
    align-self: end;
    margin-bottom: 0;
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

  .form-btn {
    align-self: end;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    }
  }
`;

export default Wrapper;
