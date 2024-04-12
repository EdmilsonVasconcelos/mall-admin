import BasePage from "../components/BasePage";
import ListCategoriesView from "../views/ListCategoriesView";

export const ListCategories = () => {
  return <BasePage contentPage={<ListCategoriesView />} />;
};

export default ListCategories;
