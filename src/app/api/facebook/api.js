// src/api.js

// Function to initiate Facebook Login
export const initiateFacebookLogin = () => {
    const clientId = '556416126937462'; // Replace with your Facebook App ID
    const redirectUri = 'http://localhost:3000/predictions';
    const configid= '935191661788190' // Redirect to your app's base URL
    const scope = 'instagram_basic,pages_show_list,business_management,read_insights,instagram_manage_insights,pages_read_engagement'; // Permissions you want to request

    const loginUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&config_id=${configid}&scope=${scope}&response_type=token`;
    window.location.href = loginUrl; // Redirect to Facebook Login
};

// Function to fetch Instagram Account ID
// src/api/facebook/api.js
export const fetchInstagramAccountId = async (accessToken) => {
    const response = await fetch(`https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account&access_token=${accessToken}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Instagram account ID');
    }
    const data = await response.json();
    return data.data; // Return the list of pages/accounts
};

export const fetchInstagramAccountDetails = async (igAccountId, accessToken) => {
    const response = await fetch(`https://graph.facebook.com/v12.0/${igAccountId}?fields=username,profile_picture_url,followers_count&access_token=${accessToken}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch Instagram account details: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data; // Return the account details
};

// Function to fetch Insights for the Instagram account
export const fetchInsights = async (igMediaId, accessToken) => {
    // Define the metrics you want to fetch
    const metrics = 'impressions,reach'; // Add any other metrics you need
    const response = await fetch(`https://graph.facebook.com/v21.0/${igMediaId}/insights?metric=reach&period=day&metric_type=time_series&since=%201704067200&until=1706572800&access_token=${accessToken}`);
    if (!response.ok) {
        throw new Error('Failed to fetch insights');
    }
    const data = await response.json();
    return data; // Return the insights data
};