// We have JSON Data:
const fetch = require('node-fetch');

const https = 'https://gist.githubusercontent.com/dhamanutd/97aa0d2131903ea8c071721032c7b2a3/raw/60f5108ca55c9a07a951c884599e6b7d07153d14/inventory_list.md';

// Your tasks:

// Find items in Meeting Room.
// Find all electronic devices.
// Find all furnitures.
// Find all items was purchased at 16 Januari 2020.
// Find all items with brown color.

function getDataFromApi(url) {
    fetch(url)
        .then(res => res.text())
        .then(data => {
            const dataJson = JSON.parse(data.substring(4, 1255))
            // Answer :

            // Find items in Meeting Room.
            const getItemsInMeetingRoom = dataJson.filter(el => el.placement.name.toLowerCase() === 'meeting room');
            const items = getItemsInMeetingRoom.map(el => el.name)
            console.log(items);

            // Find all electronic devices.
            const getInventoryElec = dataJson.filter(el => el.type === 'electronic');
            console.log(getInventoryElec);

            // Find all furnitures.
            const getInventoryFurn = dataJson.filter(el => el.type === 'furniture');
            console.log(getInventoryFurn);

            // Find all items was purchased at 16 Januari 2020. 
            const getItemsPurchased = dataJson.filter(el => new Date(el.purchased_at * 1000).getDate() === 16);
            console.log(getItemsPurchased);

            // Find all items with brown color.
            function filterByColor(tags) {
                return tags == 'brown';
            }
            const getItemColorBrown = dataJson.filter(el => el.tags.some(filterByColor));
            console.log(getItemColorBrown);

        })
        .catch(console.log);
}

getDataFromApi(https);
