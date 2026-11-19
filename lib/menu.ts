// The HAN — full menu, transcribed from the printed menu (public/the-han-menu.pdf).
//
// Prices are stored in pounds as printed ("12." → 12, "3.5" → 3.5) and
// formatted for display by `formatPrice`. Only obvious spelling slips in
// names/descriptions have been corrected (e.g. "Ceasar" → "Caesar",
// "Sandwhich" → "Sandwich", "broiche" → "brioche"); prices are untouched.
// When the printed menu changes, update this file — the /menu page, the
// homepage teaser and the structured data all read from it.

export type AddOn = {
  name: string;
  price: number;
};

export type MenuItem = {
  name: string;
  description?: string;
  price?: number;
  /** Printed beside the price, e.g. "per person". */
  priceNote?: string;
  /** A short qualifier shown under the name, e.g. "Min. 2 people". */
  note?: string;
  /** Options to choose from, e.g. stuffed croissant fillings. */
  choices?: string[];
  addOns?: AddOn[];
};

export type MenuGroup = {
  title?: string;
  note?: string;
  items: MenuItem[];
  /** Short name/price lists (sides, extras) render in a denser grid. */
  compact?: boolean;
  addOns?: AddOn[];
  addOnsLabel?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  /** Shorter label for the sticky category bar. */
  navLabel: string;
  intro?: string;
  notes?: string[];
  groups: MenuGroup[];
  addOns?: AddOn[];
  addOnsLabel?: string;
};

export const menuPdfPath = "/the-han-menu.pdf";

export const menu: MenuSection[] = [
  {
    id: "serpme",
    title: "Serpme",
    navLabel: "Serpme",
    intro: "The Turkish breakfast spread, laid out for the table.",
    notes: ["Served with bread & unlimited tea."],
    groups: [
      {
        items: [
          {
            name: "Serpme",
            price: 16,
            priceNote: "per person",
            description:
              "Egg, sucuk, cheese platter, olives, butter, seasonal fruits, honey or jam.",
          },
          {
            name: "Serpme Deluxe",
            price: 20,
            priceNote: "per person",
            note: "Min. 2 people",
            description:
              "Egg, sucuk, cheese platter, olives, butter, honey, jam, clotted cream, tomato, cucumber, sautéed mushrooms, halloumi, salami, pastirma, seasonal fruits, pishi, sigara boregi & gozleme.",
          },
        ],
      },
    ],
    addOnsLabel: "Add to your spread",
    addOns: [
      { name: "Menemen", price: 7 },
      { name: "Kuymak", price: 11 },
      { name: "Gozleme", price: 5 },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast",
    navLabel: "Breakfast",
    notes: ["Served with your choice of bread."],
    groups: [
      {
        items: [
          {
            name: "The English",
            price: 12,
            description:
              "Egg, turkey rashers, beef sausage, hashbrowns, mushrooms & beans.",
          },
          {
            name: "The Turkish",
            price: 14,
            description:
              "2 eggs (sahanda), sucuk, halloumi, mushrooms, house salad & sigara boregi.",
          },
          {
            name: "The Veggie",
            price: 14,
            description:
              "Egg, veggie sausage, hashbrowns, mushrooms, halloumi, avocado & beans.",
          },
          {
            name: "The American",
            price: 16,
            description:
              "Triple stack pancakes, 2 scrambled eggs, turkey rashers, hashbrowns & sausage.",
          },
          {
            name: "The French",
            price: 16,
            description: "French toast, egg, turkey rashers & sausage.",
          },
          {
            name: "The Han",
            price: 16,
            description:
              "2 eggs, turkey rashers, 2 sausages, chips, beans, mushrooms & halloumi.",
          },
        ],
      },
    ],
  },
  {
    id: "create-your-own",
    title: "Create Your Own",
    navLabel: "Create Your Own",
    intro: "Build your own plate, one piece at a time.",
    groups: [
      {
        compact: true,
        items: [
          { name: "Egg", price: 1.7 },
          { name: "Scrambled Eggs", price: 3.5 },
          { name: "Turkey Rashers", price: 3.5 },
          { name: "Turkey Slices", price: 2.5 },
          { name: "Beef Sausage", price: 2.5 },
          { name: "Chicken Sausage", price: 2.5 },
          { name: "Sucuk", price: 3.5 },
          { name: "Veggie Sausage", price: 2 },
          { name: "Pastirma", price: 2.5 },
          { name: "Spinach", price: 2 },
          { name: "Smoked Salmon", price: 3.5 },
          { name: "Beans", price: 1.8 },
          { name: "Mushrooms", price: 1.8 },
          { name: "Hashbrown", price: 1.4 },
          { name: "Cheesy Hashbrown", price: 1.6 },
          { name: "Tater Tots", price: 4 },
          { name: "Sweet Potato Fries", price: 4 },
          { name: "Chips", price: 4 },
          { name: "Burger", price: 5 },
          { name: "Avocado", price: 3.5 },
          { name: "Halloumi", price: 3.5 },
          { name: "Feta", price: 2.5 },
          { name: "Mozzarella", price: 2 },
          { name: "Toast", price: 1.6 },
          { name: "Simit", price: 2.5 },
          { name: "Bagel", price: 1.6 },
          { name: "Sigara Boregi", price: 2.5 },
          { name: "Pishi", price: 2 },
          { name: "Gozleme", price: 5 },
          { name: "Nutella", price: 2 },
          { name: "Clotted Cream", price: 2.5 },
          { name: "Seasonal Fruits", price: 5 },
          { name: "Honey", price: 2 },
          { name: "Butter", price: 2 },
          { name: "Jam", price: 2 },
          { name: "Cherry Tomato", price: 2 },
          { name: "Olives", price: 2 },
          { name: "Pancakes", price: 5 },
        ],
      },
    ],
  },
  {
    id: "omelettes",
    title: "Omelettes",
    navLabel: "Omelettes",
    groups: [
      {
        items: [
          {
            name: "Create Your Own Omelette",
            price: 12,
            description:
              "Choose up to 2 fillings. Served with chips and your choice of house salad or beans.",
            addOns: [{ name: "Extra filling", price: 2 }],
          },
        ],
      },
    ],
  },
  {
    id: "brunch",
    title: "Brunch",
    navLabel: "Brunch",
    groups: [
      {
        title: "On an English muffin",
        items: [
          {
            name: "Eggs Royale",
            price: 12,
            description:
              "Toasted English muffin layered with delicate ribbons of premium smoked salmon, topped with two gently poached eggs, and finished with a rich, silky house-made hollandaise sauce.",
          },
          {
            name: "Sucuk Benedict",
            price: 12,
            description:
              "Toasted English muffin and sucuk slices topped with two perfectly poached eggs, finished with a rich, house-made hollandaise sauce.",
          },
          {
            name: "Eggs Florentine",
            price: 11,
            description:
              "Toasted English muffin halves piled high with fresh baby spinach wilted in butter. Topped with two soft-poached eggs, warm house-made hollandaise, and cracked black pepper.",
          },
        ],
      },
      {
        title: "Brunch plates",
        items: [
          {
            name: "Shakshuka",
            price: 12,
            description:
              "Sizzling skillet of slow-simmered tomatoes, roasted red peppers, onions, aubergines and aromatic spices. Topped with perfectly poached eggs, crumbled feta & fresh herbs. Served with warm, crusty sourdough.",
          },
          {
            name: "Turkish Eggs",
            price: 11,
            description:
              "Two perfectly poached, warm eggs nestled in a velvety bed of cool, garlic-infused yoghurt. Finished with a dramatic drizzle of warm chilli butter, and fragrant herbs. Served with toasted sourdough for dipping.",
          },
          {
            name: "Loaded Hash Browns",
            price: 13,
            description:
              "3 hashbrowns, melted mozzarella, avocado, crispy turkey rashers & 2 soft poached eggs.",
          },
          {
            name: "Stuffed Croissant",
            price: 12,
            choices: [
              "Breakfast",
              "Salmon cream cheese",
              "Pulled beef and mature cheddar",
              "Mango and cream",
              "Chicken and maple",
              "Avocado & tomato",
              "Turkey and cheese",
              "Cream & compote",
            ],
          },
          {
            name: "Fetacado",
            price: 11,
            description:
              "Smashed avocado on sourdough topped with feta, cherry tomatoes, chilli flakes & mixed seeds.",
          },
          {
            name: "Bagel Trio",
            price: 14,
            description:
              "Choose a trio from our expertly crafted sweet or savoury bagels.",
            choices: [
              "Salmon & cream cheese",
              "Egg & turkey rashers",
              "Peanut butter & banana",
              "Smashed falafel & beetroot hummus",
            ],
          },
          {
            name: "Stuffed Simit",
            price: 12,
            description:
              "Traditional simit filled with sizzling, garlic-spiced sucuk, a perfectly fried egg, and grilled, golden-crusted halloumi cheese.",
          },
          {
            name: "Southern French Toast",
            price: 14.5,
            description:
              "Crispy chicken on a bed of lettuce topped with chipotle sauce, finely grated cheese and a warm poached egg.",
          },
          {
            name: "Eggs on Toast",
            price: 7,
            description:
              "Two eggs cooked to your liking: poached, scrambled, or fried, served on two slices of your choice of toasted bread.",
            addOns: [{ name: "Avocado", price: 3.5 }],
          },
        ],
      },
    ],
  },
  {
    id: "french-toast",
    title: "French Toasts",
    navLabel: "French Toast",
    intro:
      "Thick cut brioche, triple dipped in house mix & caramelised until golden brown.",
    groups: [
      {
        items: [
          {
            name: "Classic",
            price: 12,
            description: "Maple syrup, clotted cream and fruits.",
          },
          {
            name: "Berry Compote",
            price: 13,
            description: "Fruits, berry compote and house or clotted cream.",
          },
          {
            name: "Tiramisu",
            price: 14,
            description: "Mascarpone cream, cocoa powder and coffee to soak.",
          },
          {
            name: "French Crumble",
            price: 14,
            description: "Apple crumble and custard.",
          },
          {
            name: "Mangomania",
            price: 14,
            description: "Fresh mango, cream and mango compote.",
          },
          {
            name: "Biscoff French",
            price: 13,
            description: "Biscoff cream, Biscoff crumbs, banana & maple syrup.",
          },
        ],
      },
    ],
  },
  {
    id: "pancakes",
    title: "Pancakes",
    navLabel: "Pancakes",
    intro: "Fresh fluffy buttermilk pancakes.",
    groups: [
      {
        items: [
          {
            name: "Nutella",
            price: 12,
            description: "Nutella, maple syrup & banana.",
          },
          {
            name: "Biscoff",
            price: 11,
            description: "Biscoff cream, Biscoff crumbs & maple syrup.",
          },
          {
            name: "Mix Fruit",
            price: 12,
            description: "Mixed fruits & maple syrup.",
          },
          {
            name: "Pistachio",
            price: 11,
            description:
              "Pistachio cream, pistachio flakes, white chocolate sauce.",
          },
          {
            name: "Matcha",
            price: 13,
            description: "Matcha pancakes, maple syrup & white chocolate.",
          },
          {
            name: "Berry Compote",
            price: 12,
            description: "Berry compote & maple syrup.",
          },
          {
            name: "Mango",
            price: 13,
            description: "Fresh mango, mango sauce & maple syrup.",
          },
        ],
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    navLabel: "Lunch",
    groups: [
      {
        items: [
          {
            name: "Lasagna",
            price: 14,
            description:
              "Tender fresh pasta sheets layered with beef mince and béchamel sauce topped with golden baked mozzarella. Served with chips and salad.",
          },
          {
            name: "Chicken Shish",
            price: 14.5,
            description:
              "Marinated tender cubes of chicken breast on a bed of crisp pide served with salad and a choice of chips or rice.",
          },
          {
            name: "Manti",
            price: 12,
            description:
              "Tiny, hand-folded dumplings stuffed with minced lamb, in a warm, garlic-infused yogurt sauce, drizzled with a rich, fiery red pepper & sun dried tomato paste infused butter.",
          },
          {
            name: "Steak & Eggs",
            price: 24,
            description:
              "A premium ribeye steak, seasoned with sea salt & pepper, seared in garlic butter. Accompanied by two eggs; fried or poached. Served with crispy tater tots.",
          },
          {
            name: "Bolognese",
            price: 12,
            description:
              "Perfectly cooked spaghetti tossed in a rich, slow-simmered minced beef and tomato ragù, infused with garlic & fresh herbs. Served with a generous dusting of grated cheese.",
          },
          {
            name: "Chicken Alfredo",
            price: 14.5,
            description:
              "Herb-marinated, pan-seared chicken breast sliced over handmade tagliatelle. Coated in a decadent, garlic-infused mushroom & cream cheese sauce, finished with cracked black pepper and fresh parsley.",
          },
          {
            name: "Lamb Chops",
            price: 19,
            description:
              "Premium, tender ribeye lamb chops pan-seared to perfection with a fresh fragrant rosemary, thyme, and garlic crust. Served over a velvety potato purée and finished with a reduced lamb stock.",
          },
        ],
      },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    navLabel: "Sides",
    groups: [
      {
        compact: true,
        items: [
          { name: "Mash", price: 4 },
          { name: "Chips", price: 3 },
          { name: "Salad", price: 5 },
          { name: "Tater Tots", price: 3 },
          { name: "Truffle Fries", price: 4 },
        ],
      },
    ],
  },
  {
    id: "jacket-potatoes",
    title: "Jacket Potatoes",
    navLabel: "Jacket Potatoes",
    notes: ["Served with house salad."],
    groups: [
      {
        items: [
          { name: "Cheese & Beans", price: 8 },
          { name: "Tuna & Cheese", price: 9 },
          { name: "Chicken & Slaw", price: 11 },
          { name: "Bolognese & Cheese", price: 11 },
          { name: "Four Cheese", price: 10 },
        ],
      },
    ],
  },
  {
    id: "sandwiches-wraps",
    title: "Sandwiches & Wraps",
    navLabel: "Sandwiches & Wraps",
    groups: [
      {
        items: [
          {
            name: "Chicken Caesar",
            price: 8,
            description:
              "Crispy or grilled chicken, Caesar sauce, lettuce, cherry tomato and grated cheese.",
          },
          {
            name: "Tuna & Mozzarella",
            price: 7,
            description:
              "Tuna chunks in mayo, fried mozzarella, red onion and crisp salad leaves.",
          },
          {
            name: "Dynamite Prawn",
            price: 9,
            description:
              "Jumbo prawns tossed in dynamite sauce and crispy onions & lettuce.",
          },
          {
            name: "Breakfast",
            price: 11,
            description:
              "Beef sausage, eggs, turkey rashers & cheesy hashbrowns.",
          },
          {
            name: "Falafel and Hummus",
            price: 8,
            description:
              "Beetroot whipped hummus, falafels, rocket, caramelised onions & mayo.",
          },
          {
            name: "Steak Sandwich",
            price: 12,
            description:
              "Ribeye steak, house mushroom sauce & caramelised onions.",
          },
          {
            name: "Posh Cheddar",
            price: 7,
            description:
              "Mature cheddar, rocket, red onions, caramelised onions & sun dried tomato.",
          },
        ],
      },
    ],
    addOnsLabel: "Make it a croissant",
    addOns: [{ name: "Croissant base", price: 2 }],
  },
  {
    id: "paninis",
    title: "Paninis",
    navLabel: "Paninis",
    groups: [
      {
        items: [
          { name: "Mozzarella, Tomato & Avo", price: 8 },
          { name: "Tuna Melt", price: 7 },
          { name: "Chicken & Cheese", price: 8 },
          { name: "Halloumi & Sucuk", price: 8 },
        ],
      },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    navLabel: "Burgers",
    groups: [
      {
        items: [
          {
            name: "Classic",
            price: 9,
            description: "Beef burger, cheese, onion, lettuce and tomato.",
          },
          {
            name: "Hot Honey Drizzle",
            price: 12,
            description:
              "Crispy chicken, hot honey sauce & house double fried fresh mozzarella.",
          },
          {
            name: "Chicken Caesar",
            price: 12,
            description:
              "Grilled chicken served on a bed of crispy lettuce, Caesar sauce & cheese.",
          },
          {
            name: "Truffle",
            price: 12,
            description:
              "Beef burger, house-made creamy mushroom sauce and cheese.",
          },
          {
            name: "Butcher & Bird",
            price: 12,
            description:
              "Smashed beef, crispy or grilled chicken, cheese and tomato.",
          },
          {
            name: "Halloumi & Spicy Jam",
            price: 13,
            description:
              "Beef patty, double fried crispy halloumi & house-made spicy jam.",
          },
          {
            name: "Smashed",
            price: 11,
            description:
              "Double smashed beef burger with crispy fried onions, cheese, maple & turkey rashers.",
          },
          {
            name: "Pulled Beef",
            price: 13,
            description:
              "Slow cooked caramelised pulled beef on a smashed patty and cheese.",
          },
        ],
      },
    ],
    addOnsLabel: "Add a side",
    addOns: [
      { name: "Chips", price: 4 },
      { name: "Beans", price: 1.8 },
      { name: "Onion Rings", price: 4 },
      { name: "Tater Tots", price: 4 },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    navLabel: "Salads",
    groups: [
      {
        items: [
          {
            name: "Chicken Caesar",
            price: 13,
            description:
              "Crunchy romaine lettuce tossed in our creamy house-made Caesar dressing, topped with shaved hard cheese and garlic-herb croutons.",
          },
          {
            name: "House Salad",
            price: 10,
            description:
              "Crisp mixed leaves, cherry tomatoes, olives & crumbled feta cheese, tossed with sweet bell peppers and finished with our house dressing.",
          },
          {
            name: "Falafel & Hummus",
            price: 13,
            description:
              "House-made falafel, beetroot hummus, mixed tomatoes, cucumber, and red onion. Finished with extra virgin olive oil and a drizzle of pomegranate molasses.",
          },
          {
            name: "Avo-Loumi",
            price: 12,
            description:
              "Grilled halloumi & fresh avocado tossed with cherry tomatoes, red onion, cucumber and crunchy croutons. Drizzled with extra virgin olive oil & sweet pomegranate molasses.",
          },
        ],
      },
    ],
  },
  {
    id: "kids",
    title: "Kids Meals",
    navLabel: "Kids",
    notes: ["£8 each — includes a kids drink."],
    groups: [
      {
        items: [
          { name: "Breakfast", price: 8, description: "Sausage, egg and chips." },
          {
            name: "Fish Fingers",
            price: 8,
            description: "Fish fingers, chips and beans.",
          },
          {
            name: "Burger",
            price: 8,
            description: "Hamburger, chips and beans.",
          },
          {
            name: "Nuggets",
            price: 8,
            description: "Chicken nuggets, chips and beans.",
          },
          {
            name: "Bolognese",
            price: 8,
            description: "Spaghetti bolognese.",
          },
        ],
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    navLabel: "Desserts",
    notes: ["Served with ice cream, cream or custard."],
    groups: [
      {
        items: [
          { name: "Tiramisu", price: 8 },
          { name: "San Sebastian", price: 9 },
          { name: "Chocolate Fudge", price: 7 },
          { name: "Kunefe", price: 12 },
          { name: "Apple Crumble", price: 7 },
        ],
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    navLabel: "Drinks",
    groups: [
      {
        title: "Hot Drinks",
        compact: true,
        items: [
          { name: "English Tea", price: 2 },
          { name: "Earl Grey Tea", price: 2 },
          { name: "Turkish Tea", price: 2 },
          { name: "Herbal Tea", price: 2.8 },
          { name: "Cappuccino", price: 3.5 },
          { name: "Latte", price: 3.5 },
          { name: "Flat White", price: 3.5 },
          { name: "Espresso", price: 2.5 },
          { name: "Mocha", price: 3.9 },
          { name: "Hot Chocolate", price: 3 },
          { name: "Turkish Coffee", price: 3 },
          { name: "Spanish Latte", price: 5 },
          { name: "Macchiato", price: 3.2 },
          { name: "Americano", price: 3.2 },
        ],
        addOnsLabel: "Extras",
        addOns: [
          { name: "Non-dairy milk", price: 0.7 },
          { name: "Syrup", price: 0.7 },
          { name: "Whipped cream", price: 0.7 },
          { name: "Marshmallows", price: 0.7 },
        ],
      },
      {
        title: "Iced Coffee",
        compact: true,
        items: [
          { name: "Caramel", price: 5 },
          { name: "Hazelnut", price: 5 },
          { name: "Vanilla", price: 5 },
          { name: "Nutella Iced Latte", price: 6 },
          { name: "Spanish Iced Latte", price: 6 },
          { name: "Biscoff Iced Latte", price: 6 },
          { name: "Tiramisu Iced Latte", price: 6 },
          { name: "White Choc Iced Latte", price: 6 },
          { name: "Raspberry & White Choc Iced Latte", price: 6 },
        ],
      },
      {
        title: "Matcha",
        compact: true,
        items: [
          { name: "Hazelnut", price: 5 },
          { name: "Caramel", price: 5 },
          { name: "Vanilla", price: 5 },
          { name: "Cloud Matcha", price: 5.5 },
          { name: "Mango", price: 5.5 },
          { name: "Biscoff", price: 5.5 },
          { name: "Strawberry", price: 5.5 },
          { name: "White Choc", price: 5.5 },
          { name: "Pistachio", price: 5.5 },
          { name: "Raspberry", price: 5.5 },
          { name: "Blueberry", price: 5.5 },
          { name: "Banana Bread", price: 5.5 },
        ],
      },
      {
        title: "Glow Juice",
        items: [
          {
            name: "Golden",
            price: 6,
            description:
              "Chilli + coconut milk + ginger + mango + orange + papaya + turmeric.",
          },
          {
            name: "Matcha",
            price: 6,
            description:
              "Apple + banana + matcha powder + pineapple + spinach.",
          },
        ],
      },
      {
        title: "Smoothies",
        items: [
          {
            name: "Dazzling Dragon",
            price: 5.5,
            description:
              "Apple + banana + blueberries + dragon fruit + lime + mango.",
          },
          {
            name: "Ginger Beets",
            price: 5.5,
            description: "Beetroot + blueberries + ginger + pineapple.",
          },
          {
            name: "Blue Blast",
            price: 5.5,
            description:
              "Apple + banana + lime + peach + pineapple + spirulina.",
          },
          {
            name: "Raspberry Heaven",
            price: 5.5,
            description: "Apple + blueberries + mango + raspberries.",
          },
          {
            name: "Green Reviver",
            price: 5.5,
            description: "Banana + kale + lemongrass + mango.",
          },
          {
            name: "Strawberry Delight",
            price: 5.5,
            description: "Papaya + peach + strawberries.",
          },
          {
            name: "Acai Kick",
            price: 5.5,
            description: "Acai berries + blueberries + mango + strawberries.",
          },
          {
            name: "Pineapple Sunset",
            price: 5.5,
            description: "Mango + papaya + pineapple.",
          },
          {
            name: "Passion Storm",
            price: 5.5,
            description:
              "Aloe vera + guava + papaya + passion fruit + peach + pineapple.",
          },
        ],
      },
      {
        title: "Milkshakes",
        compact: true,
        items: [
          { name: "Strawberry", price: 5 },
          { name: "Chocolate", price: 5 },
          { name: "Banana", price: 5 },
          { name: "Vanilla", price: 5 },
          { name: "Pistachio", price: 5 },
          { name: "Oreo", price: 5.5 },
          { name: "Bueno", price: 5.5 },
          { name: "Bounty", price: 5.5 },
          { name: "Snickers", price: 5.5 },
          { name: "Terry's Orange", price: 5.5 },
          { name: "Ferrero Rocher", price: 5.5 },
        ],
      },
      {
        title: "Cold Drinks",
        compact: true,
        items: [
          { name: "Coke", price: 1.8 },
          { name: "Sprite", price: 1.8 },
          { name: "Fanta", price: 1.8 },
          { name: "Lucozade", price: 2.8 },
          { name: "Rose Lemonade", price: 3.5 },
          { name: "Ice Tea", price: 2.8 },
          { name: "Red Bull / Monster", price: 2.8 },
          { name: "Fresh Orange Juice", price: 5.5 },
          { name: "Ribena / Fruit Shoot", price: 2 },
          { name: "Still Water", price: 1.5 },
          { name: "Sparkling Water", price: 2.5 },
        ],
      },
    ],
  },
];

/** "12" for whole pounds, "3.50" otherwise — always £-prefixed. */
export function formatPrice(price: number): string {
  return Number.isInteger(price) ? `£${price}` : `£${price.toFixed(2)}`;
}

/** Looks up a dish by section id + name; throws so a stale reference fails the build. */
export function getMenuItem(sectionId: string, name: string): MenuItem {
  const section = menu.find((s) => s.id === sectionId);
  const item = section?.groups.flatMap((g) => g.items).find((i) => i.name === name);
  if (!item) {
    throw new Error(`Menu item not found: ${sectionId} / ${name}`);
  }
  return item;
}

export const menuItemCount = menu.reduce(
  (total, section) =>
    total + section.groups.reduce((n, group) => n + group.items.length, 0),
  0
);
