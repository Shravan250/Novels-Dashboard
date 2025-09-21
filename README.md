# Readscape - Novels Dashboard

## Project Overview

Readscape is a responsive web application for managing a collection of novels. It allows users to **view, search, filter, add, edit, and delete novels** efficiently. The dashboard is built using **React, TypeScript, and Tailwind CSS**, and interacts with an API for CRUD operations.

## Features

- **Responsive Table View:** Display all novels in a paginated table.
- **Global Search:** Quickly search across all columns.
- **Column Filters:** Filter data per column.
- **CRUD Operations:**

  - **Add Novel:** Add new novels with section, title, link, status, tags, and remarks.
  - **Edit Novel:** Modify existing novel details.
  - **Delete Novel:** Remove novels from the collection.

- **Pagination:** Control number of entries per page.
- **Loading & Empty States:** User-friendly messages when fetching data or no data is found.
- **Tag Management:** Supports comma-separated tags.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Icons
- **State Management:** React Hooks, `useState`, `useEffect`, `useMemo`
- **API Integration:** Axios for HTTP requests
- **Components:**

  - `NovelsContainer` - Main container handling state, search, filters, and modals.
  - `NovelTable` - Table component with filtering, pagination, and actions.
  - `AddModal` - Modal for adding novels.
  - `EditModal` - Modal for editing novels.
  - `DeleteModal` - Modal for confirming deletions.

## Project Structure

```
src/
├── api/
│   └── axios.ts          # Axios instance configuration
├── components/
│   └── novels/
│       ├── AddModal.tsx
│       ├── EditModal.tsx
│       ├── DeleteModal.tsx
│       ├── NovelTable.tsx
│       ├── NovelsContainer.tsx
│       ├── columns.ts
│       ├── types.ts
│       └── useNovels.ts   # Custom hook for fetching and managing novels
├── App.tsx
└── index.tsx
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/readscape.git

# Navigate to project directory
cd readscape

# Install dependencies
npm install
# or
yarn install
```

### Running the Project

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### API

The project expects a backend API for novels at `/api/novels` with the following endpoints:

- `GET /api/novels` - Fetch all novels
- `POST /api/novels` - Add a novel
- `PUT /api/novels/:id` - Update a novel
- `DELETE /api/novels/:id` - Delete a novel

## Usage

- Use the **Add Novel** button to add a new entry.
- Click the **Edit** icon to update a novel.
- Click the **Delete** icon to remove a novel.
- Use the search box or per-column filters to find novels quickly.
- Change **entries per page** to control pagination.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

_Readscape - Manage your novels efficiently and beautifully._
