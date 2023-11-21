import styled from 'styled-components';

interface WrapperProps {
  $type: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: 300px;
  background: rgb(153, 246, 228);
  background: radial-gradient(
    circle,
    rgba(153, 246, 228, 1) 0%,
    rgba(204, 251, 241, 0.5298494397759104) 48%,
    rgba(240, 253, 250, 1) 100%
  );
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* grid-template-rows: 1fr auto; */
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  color: inherit;

  .img {
    width: 100%;
    border-radius: var(--border-radius);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem;
    flex: 1;
    gap: 0.5rem;

    .btn {
      height: 2.5rem;
    }
  }

  .content-info {
    gap: 1rem;
  }

  .content-header {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
  }

  .on-sale,
  .search {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: var(--border-radius);

    .img {
      color: #f59e0b;
    }
  }
  &:hover {
    box-shadow: var(--shadow-4);
  }

  .price {
    flex: 1;
    align-self: flex-end;
  }

  .categories {
    flex: 1;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    text-transform: uppercase;
    height: 100%;

    .title {
      text-transform: uppercase;
      font-weight: bold;
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      border-top: 1px solid var(--primary-500);
      padding-top: 0.5rem;
      gap: 0.5rem;
      width: 100%;
    }

    .tag {
      background: var(--primary-200);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      color: var(--tag-color);
    }
  }

  h2 {
    font-weight: bold;
    text-transform: uppercase;
    align-self: center;
    font-size: 2rem;
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--primary-500);
  }

  h3 {
    font-size: 1.2rem;
  }

  @media (width > 768px) {
    width: ${(props) => (props.$type === 'detail' ? '90%' : '300px;')};
    flex-direction: ${(props) => (props.$type === 'detail' ? 'row' : 'column')};

    .content-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }

    .img {
      width: 50%;
    }
  }
`;

export default Wrapper;
