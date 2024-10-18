import { ToDoList } from "./toDoList";
import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList } from "./constants";

describe("To-Do List Test", () => {
    test("verify displaying items", () => {
        render(<ToDoList/>);
        
        dummyGroceryList.forEach(item => {
            const itemName = screen.getByText(item.name);
            expect(itemName).toBeInTheDocument();
        });
    });

    test("verify num of checked items", () => {
        render(<ToDoList/>);
        
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

        fireEvent.click(checkboxes[2%checkboxes.length]); // randomly check some boxes
        fireEvent.click(checkboxes[4%checkboxes.length]);
        fireEvent.click(checkboxes[7%checkboxes.length]);
        
        const itemsBoughtText = screen.getByText(/Items bought:/i);
        const content = itemsBoughtText?.textContent || "Items bought: 0";
        const numBought = parseInt(content.match(/\d+/)?.[0] || '0', 10);

        const checkedCheckboxes = checkboxes.filter(checkbox => checkbox.checked);

        expect(numBought).toBe(checkedCheckboxes.length);
    });
});