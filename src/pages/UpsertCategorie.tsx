import BasePage from "../components/BasePage";
import UpsertCategorieView from "../views/UpsertCategorieView";

export const UpsertCategorie = () => {
  return <BasePage contentPage={<UpsertCategorieView />} />;
};

export default UpsertCategorie;
