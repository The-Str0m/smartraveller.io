export const bmtcTypes = [
   //this is the stuff for the icons 
   //A project by NTA and Pranav Soggy 
    {
        id: 'vajra',
        name: 'Vajra',
        desc: 'The AC Bus of Bangalore, Vajras are Volvo buses/electric AC.',
        icon: 'wind'
    },
    {
        id: 'vayu',
        name: 'Vayu Vajra',
        desc: 'Airport shuttle service providing 24/7 connectivity to KIA, .',
        icon: 'plane'
    },
    {
        id: 'ordinary',
        name: 'BMTC Ordinary',
        desc: 'Non-AC buses covering every corner of Bangalore.',
        icon: 'bus'
    },
    
];

export const popularRoutes = [
    { code: 'KIA-8', from: 'Electronic City', to: 'Airport', type: 'Vayu Vajra' },
    { code: '500-D', from: 'Silk Board', to: 'Hebbal', type: 'Vajra' },
    { code: '335-E', from: 'Majestic', to: 'Kadugodi', type: 'Vajra' },
    { code: '201-J', from: 'Srinagar', to: 'Domlur', type: 'Ordinary' },
    { code: 'MF-12', from: 'Banashankari', to: 'Metro', type: 'Feeder' }
];
