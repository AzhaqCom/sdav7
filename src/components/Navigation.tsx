import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8 items-center">
            <Link to="/sdav7/" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
              Game Interface
            </Link>
            <Link to="/sdav7/admin" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
              Admin Interface
            </Link>
            <Link to="/sdav7/rule" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
              Rule
            </Link>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}