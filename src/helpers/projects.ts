import { ProjectItemType } from 'types';

/**
 * Gets the minimum and maximum prices from projects' implementationCost.shell values
 * @param projects - Array of project items
 * @returns Object with minPrice and maxPrice
 */
export const getPriceRange = (projects: ProjectItemType[]) => {
  if (!projects || projects.length === 0) {
    return { minPrice: 0, maxPrice: 0 };
  }

  const shellPrices = projects
    .map((project) => project.implementationCost.shell)
    .filter((price) => price > 0); // Skip 0 values

  if (shellPrices.length === 0) {
    return { minPrice: 0, maxPrice: 0 };
  }

  const minPrice = Math.min(...shellPrices);
  const maxPrice = Math.max(...shellPrices);

  return { minPrice, maxPrice };
};
