import BasePage from "../components/BasePage";
import UpsertCategoryView from "../views/UpsertCategoryView";

export const UpsertCategory = () => {
  return <BasePage contentPage={<UpsertCategoryView />} />;
};

export default UpsertCategory;
