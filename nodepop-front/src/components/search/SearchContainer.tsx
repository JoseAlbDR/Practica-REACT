// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Link, Form, useNavigation, useSubmit } from 'react-router-dom';

// import StyledSearchContainer from './styles/StyledSearchContainer';

// import { FormSearchPrices, FormRowSelect, FormRowInput } from '../shared/';
// import { changePriceNameUrl } from '../../utils';
// import { useAdverts } from '../../context/AdvertsContext';

// import { useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { getTags } from '../../store/selectors';

// const SearchContainer = () => {
//   const { min, max, params } = useAdverts();
//   const tags = useSelector(getTags);

//   const formRef = useRef<HTMLFormElement>(null);

//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === 'submitting';

//   const submit = useSubmit();

//   const selectText = (e: React.MouseEvent<HTMLInputElement>) => {
//     (e.target as HTMLInputElement).focus();
//     (e.target as HTMLInputElement).select();
//   };

//   const debounce = (onChange: (e: any) => void) => {
//     let timeout: NodeJS.Timeout | undefined;
//     return (e: { currentTarget: { form: unknown } }) => {
//       const form = e.currentTarget.form;
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         onChange(form);
//       }, 1000);
//     };
//   };

//   return (
//     <StyledSearchContainer>
//       <div className="search-form">
//         <Form id="search-form" ref={formRef}>
//           <h4>Search</h4>
//           <div className="form-center">
//             <FormRowInput
//               onChange={debounce((form) => {
//                 if (form) changePriceNameUrl(formRef);
//                 submit(form);
//               })}
//               type="search"
//               name="productName"
//               labelText="name"
//               defaultValue={params.productName}
//               disabled={isSubmitting}
//               onClick={selectText}
//             />
//             <FormSearchPrices
//               onChange={submit}
//               formRef={formRef}
//               defaultValue={[min, max]}
//             />
//             <FormRowSelect
//               name="type"
//               types={['all', 'On sale', 'Search']}
//               selected={params.type}
//               formRef={formRef}
//               onChange={submit}
//             />
//             <FormRowSelect
//               name="tags"
//               types={['all', String(...tags)]}
//               selected={params.tags}
//               formRef={formRef}
//               onChange={submit}
//             />
//             <Link className="btn btn-block form-btn" to={`/adverts`}>
//               Reset Search Values
//             </Link>
//           </div>
//         </Form>
//       </div>
//     </StyledSearchContainer>
//   );
// };

// export default SearchContainer;
