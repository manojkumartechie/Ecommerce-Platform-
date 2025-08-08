import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, colorPreset, toggleTheme, setColorPreset } = useTheme();
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const colorPresets = [
    { name: 'blue', color: '#3B82F6' },
    { name: 'purple', color: '#8B5CF6' },
    { name: 'green', color: '#10B981' },
    { name: 'orange', color: '#F59E0B' },
    { name: 'red', color: '#EF4444' },
  ];

  return (
    <div className="relative flex items-center space-x-2">
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'light' ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-blue-400" />
          )}
        </motion.div>
      </motion.button>

      {/* Color Preset Toggle */}
      <motion.button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </motion.button>

      {/* Color Picker Dropdown */}
      {showColorPicker && (
        <motion.div
          className="absolute top-full right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex space-x-2">
            {colorPresets.map((preset) => (
              <motion.button
                key={preset.name}
                onClick={() => {
                  setColorPreset(preset.name as any);
                  setShowColorPicker(false);
                }}
                className={`w-8 h-8 rounded-full border-2 ${
                  colorPreset === preset.name
                    ? 'border-gray-900 dark:border-white'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                style={{ backgroundColor: preset.color }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ThemeToggle;