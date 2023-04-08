import type { NextPage } from 'next';
import Link from 'next/link';

interface Menus {
  path: string;
  textMenu: string;
}

const pageMenus = [
  {
    title: 'Basic',
    menus: [
      { path: '/chapter/geometries', textMenu: 'Geometries' },
      { path: '/chapter/text', textMenu: 'Text' },
      { path: '/chapter/texture', textMenu: 'Texture' },
      { path: '/chapter/materials', textMenu: 'Materials' },
    ],
  },

  {
    title: 'Classic Techniques',
    menus: [
      { path: '/chapter/light', textMenu: 'Light' },
      { path: '/chapter/shadows', textMenu: 'Shadows' },
      { path: '/chapter/model', textMenu: 'Importing Model' },
    ],
  },

  {
    title: 'Classic Techniques',
    menus: [
      { path: '/practice/haunted-house', textMenu: 'Haunted house' },
      { path: '/practice/light', textMenu: 'Duo light performance' },
      { path: '/practice/saturn', textMenu: 'Saturn' },
      { path: '/practice/stencil', textMenu: 'Stencil' },
    ],
  },
];

const Menu = ({ title, menus }: { title: string; menus: Menus[] }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <ul className="mt-2">
        {menus.map((item, i) => (
          <li
            key={`${title}-${item.path}`}
            className="text hover:text-blue-500"
          >
            <Link href={item.path}>{item.textMenu}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <nav className="p-6 flex flex-none">
        <div className="flex-1" />
        <div className="flex items-center">
          <h1 className="text-3xl">
            Learning <b>Three.js</b>
          </h1>
        </div>
        <div className="flex-1" />
      </nav>
      <main className="p-4 grid grid-cols-3 gap-3">
        {pageMenus.map((menu, i) => (
          <Menu key={menu.title} title={menu.title} menus={menu.menus} />
        ))}
      </main>
    </>
  );
};

export default Home;
