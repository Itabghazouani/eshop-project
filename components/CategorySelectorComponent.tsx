import { Category } from '@/sanity.types';

interface ICategorySelectorComponentProps {
  categories: Category[];
}

const CategorySelectorComponent = ({
  categories,
}: ICategorySelectorComponentProps) => {
  return <div>CategorySelectorComponent</div>;
};

export default CategorySelectorComponent;
