const recipes = {
    "focaccia-bread": {
        id: "focaccia-bread",
        href: "recipes/focaccia-bread.html",
        icon: "icon-birthday-cat",
        title: "Focaccia Bread",
        description: "A crispy, airy Italian classic",
        difficulty: "medium",
        time: "2 days",
    },
    "garlic-parm-pasta": {
        id: "garlic-parm-pasta",
        href: "recipes/maddies-garlic-parm-pasta.html",
        icon: "icon-thumbs-up-cat",
        title: "Garlic Parm Pasta",
        description: "Quick, creamy, and garlicky dinner",
        difficulty: "easy",
        time: "20 min",
    },
    "focaccia-dip": {
        id: "focaccia-dip",
        href: "recipes/maddies-focaccia-dip.html",
        icon: "icon-fish-cat",
        title: "Focaccia Dip",
        description: "Olive oil & balsamic dipping sauce",
        difficulty: "easy",
        time: "5 min",
    },
};
function get(id) {
    return recipes[id];
}
export default { get };
