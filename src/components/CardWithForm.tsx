import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export function CardWithForm() {
  const [link, setLink] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [links, setLinks] = React.useState([]);
  const [popupCategory, setPopupCategory] = React.useState(null);
  const [newCategory, setNewCategory] = React.useState("");
  const [newCategorys, setNewCategorys] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchLinks();
        fetchCategory();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchLinks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "links"));
      const fetchedLinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLinks(fetchedLinks);
    } catch (error) {
      console.error("Error fetching links: ", error);
      alert("Error fetching links.");
    }
  };

  const fetchCategory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "category"));
      const fetchedCat = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewCategorys(fetchedCat);
    } catch (error) {
      console.error("Error fetching Category: ", error);
      alert("Error fetching Category.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link || !category || !user) return;

    try {
      await addDoc(collection(db, "links"), {
        name,
        link,
        category,
        createdAt: new Date(),
        createdBy: user.uid,
      });

      setName("");
      setLink("");
      setCategory("");
      alert("Bookmark added successfully!");
    } catch (error) {
      console.error("Error adding bookmark: ", error);
      alert("Error adding bookmark.");
    }
  };

  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory || !user) return;

    try {
      await addDoc(collection(db, "category"), {
        newCategory,
        createdAt: new Date(),
        createdBy: user.uid,
      });

      setNewCategory("");
      alert("Category added successfully!");

      fetchCategory();
    } catch (error) {
      console.error("Error adding Category: ", error);
      alert("Error adding Category.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "links", id));
      alert("Bookmark deleted successfully!");
      fetchLinks();
    } catch (error) {
      console.error("Error deleting bookmark: ", error);
      alert("Error deleting bookmark.");
    }
  };

  const handleEdit = async (id, currentName, currentLink, currentCategory) => {
    const newName = prompt("Enter new name:", currentName);
    const newLink = prompt("Enter new link:", currentLink);
    const newCategory = prompt("Enter new category:", currentCategory);

    if (newName && newLink && newCategory) {
      try {
        await updateDoc(doc(db, "links", id), {
          name: newName,
          link: newLink,
          category: newCategory,
        });
        alert("Bookmark updated successfully!");
        fetchLinks();
      } catch (error) {
        console.error("Error updating bookmark: ", error);
        alert("Error updating bookmark.");
      }
    }
  };

  const groupedLinks = links.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {});

  return (
    <div className="flex flex-grow justify-between min-h-[90vh]">
      <div className="grow-0 h-full">
        <Card className="dark:bg-neutral-700 w-[350px]">
          <CardHeader>
            <CardTitle>ADD BOOKMARK</CardTitle>
            <CardDescription>
              Add your new bookmark in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="Name"
                    placeholder="Add Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    placeholder="Add links"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="framework">Bookmarks</Label>
                  <Select
                    onValueChange={(value) => setCategory(value)}
                    value={category}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue
                        className="dark:bg-neutral-600"
                        placeholder="Select"
                      />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {newCategorys.map((cat, id) => (
                        <SelectItem key={id} value={cat.newCategory}>
                          {cat.newCategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardFooter className="flex mt-5  px-0 justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setLink("");
                    setCategory("");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
        <Card className="dark:bg-neutral-700 mt-5 w-[350px]">
          <CardHeader>
            <CardTitle>ADD Category</CardTitle>
            <CardDescription>Add new category in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCatSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="categoryName"
                    placeholder="Add Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>
              </div>
              <CardFooter className="flex mt-5  px-0 justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setNewCategory("");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grow-2 h-full p-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          {Object.keys(groupedLinks).map((category, idx) => (
            <Button
              key={idx}
              onClick={() => setPopupCategory(category)}
              className="px-4 py-2 bg-gray-600 dark:hover:bg-blue-900 text-white rounded-lg"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Popup Card */}
        {popupCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-lg w-[700px] max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-neutral-700 z-10">
                <CardHeader>
                  <CardTitle>{popupCategory} Bookmarks</CardTitle>
                  <CardDescription>
                    All your saved bookmarks in {popupCategory}.
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent>
                {groupedLinks[popupCategory]?.map((linkItem) => (
                  <div key={linkItem.id} className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{linkItem.name}</p>
                        <p className="text-sm text-gray-500">{linkItem.link}</p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            handleEdit(
                              linkItem.id,
                              linkItem.name,
                              linkItem.link,
                              linkItem.category
                            )
                          }
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(linkItem.id)}
                        >
                          <MdOutlineDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => setPopupCategory(null)}
                  variant="outline"
                >
                  Close
                </Button>
              </CardFooter>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
