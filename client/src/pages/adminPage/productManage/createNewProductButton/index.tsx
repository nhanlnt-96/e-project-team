import {message} from 'antd';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import {useFormik} from 'formik';
import ProductForm from 'pages/adminPage/productManage/productForm';
import React, {useState} from 'react';
import {ICreateProductData} from 'services/product';
import * as Yup from 'yup';

const CreateNewProductButton: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false);

    const initialValues: ICreateProductData = {
        productName: '',
        productPrice: 0,
        description: '',
        image: null,
        categoryId: 0
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            productName: Yup.string().required('Product name can not be null.'),
            productPrice: Yup.number().min(1, 'Product price can not be smaller or equal 0.').typeError('Product price must a number.'),
            description: Yup.string().required('Product description can not be null.'),
            image: Yup.mixed().required('Product image must be have at least 1.'),
            categoryId: Yup.number().min(1, 'Please select a category.').typeError('Please select a category.')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });
    const handleOpenModal = () => setIsShowModal(true);

    const handleCloseModal = () => {
        setIsShowModal(false);

        formik.resetForm();
    };

    return (
        <>
            {contextHolder}
            <ButtonComp onClick={handleOpenModal} isPrimary={false}>
                Create new product
            </ButtonComp>
            <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Create new product'>
                <ProductForm formik={formik} isLoading={isCreatingProduct} isDisabledSubmitButton={false}/>
                {/* !validateObject<ICreateProductData>(formik.values)*/}
            </ModalComp>
        </>
    );
};

export default CreateNewProductButton;