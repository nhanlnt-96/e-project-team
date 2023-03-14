import {message} from 'antd';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import {useFormik} from 'formik';
import CategoryForm from 'pages/adminPage/categoryManage/categoryForm';
import React, {useState} from 'react';
import {getAllCategoryThunk} from 'redux/categoryManage/getAllCategorySlice';
import {useAppDispatch} from 'redux/hooks';
import {createCategoryService, ICreateCategoryData} from 'services/category';
import * as Yup from 'yup';

const CreateNewCategoryBtn: React.FC = () => {
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false);

    const initialValues: ICreateCategoryData = {
        categoryName: '',
        categoryImage: null
    };

    const formik = useFormik<ICreateCategoryData>({
        initialValues: initialValues,
        validateOnChange: false,
        enableReinitialize: true,
        validationSchema: Yup.object({
            categoryName: Yup.string().required('Category name can not be null.'),
            categoryImage: Yup.mixed().required('Category image is required.')
        }),
        onSubmit: async (values) => {
            setIsCreatingCategory(true);
            try {
                const response = await createCategoryService(values);

                if (response) {
                    messageApi.open({
                        type: 'success',
                        content: 'Category is created.'
                    });

                    formik.resetForm();

                    dispatch(getAllCategoryThunk());

                    handleCloseModal();
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: error as string
                });
            }

            setIsCreatingCategory(false);
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
                Create new category
            </ButtonComp>
            <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Create new category'>
                <CategoryForm isLoading={isCreatingCategory} formik={formik}/>
            </ModalComp>
        </>
    );
};

export default CreateNewCategoryBtn;