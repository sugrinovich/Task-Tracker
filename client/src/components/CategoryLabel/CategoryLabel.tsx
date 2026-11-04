import type { TaskCategory } from "../../types/task";

import "./CategoryLabel.css";


const CATEGORY_LABELS: Record<TaskCategory, string> = {
    dev: "Разработка",
    design: "Дизайн",
    marketing: "Маркетинг",
};


type CategoryLabelProps = {
    category: TaskCategory;
};

// Цветной квадрат + название категории
function CategoryLabel({ category }: CategoryLabelProps) {
    return (
        <span className={`CategoryLabel CategoryLabel--${category}`}>
            {CATEGORY_LABELS[category]}
        </span>
    );
}

export default CategoryLabel;
