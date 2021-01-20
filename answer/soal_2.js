const fetch = require('node-fetch');

const url = 'https://gist.githubusercontent.com/dhamanutd/6993984928506eea49908c2e3fcbc628/raw/65e5c2b0874f6efefb99db824cff922ca9435193/profile_list.md';

// Your tasks:  
// Find users who doesn't have any phone numbers. 
// Find users who have articles. 
// Find users who have "annis" on their name. 
// Find users who have articles on year 2020. 
// Find users who are born on 1986. 
// Find articles that contain "tips" on the title. 
// Find articles published before August 2019.

async function getData(url) {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(4, 1824));
    
    // Answer

    // Find users who doesn't have any phone numbers
    const getUserWithoutPhoneNumber = json.filter(el => el.profile.phones.length == 0);
    // console.log(getUserWithoutPhoneNumber);

    //Find users who have articles
    const getUserHaveArticles = json.filter(el => el['articles:'].length > 0);
    console.log(getUserHaveArticles);

    // Find users who have "annis" on their name.
    const getUserContainsChar = json.filter(el => el.profile.full_name.toLowerCase().indexOf('annis') !== -1);
    // console.log(getUserContainsChar);

    // Find users who have articles on year 2020.
    const getArticlesOnYear = json.filter(el => {
        const publishedAt = el['articles:'].some(({ published_at }) => new Date(published_at).getFullYear() == 2020 )
        return publishedAt;
    });
    // console.log(getArticlesOnYear);

    // Find users who are born on 1986. 
    const getUserWasBorn = json.filter(el => el.profile.birthday.substring(0, 4) === '1986');
    // console.log(getUserWasBorn);

    // Find articles that contain "tips" on the title.
    let getArticlesContainsTips; 
    json.map(el =>  {
        getArticlesContainsTips =  el['articles:'].filter(({ title }) => title.toLowerCase().includes('tips'));
    });
    // console.log(getArticlesContainsTips);
    
    // Find articles published before August 2019.
    const getArticlesPublishedBeforeAugust = json.map(el => {
        return el['articles:'].filter(({ published_at }) => new Date(published_at).getMonth() < 7); 
    })
    // console.log(getArticlesPublishedBeforeAugust);
}

getData(url);
