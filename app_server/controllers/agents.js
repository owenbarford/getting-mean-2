/* GET 'home' page */ 
const homelist = function(req, res){
    res.render('agents-list', { 
        title: 'SupportApp - for all of your Support Team information',
        pageHeader: {
            title: 'SupportApp',
            strapline: 'Find information about the Support Team!'
        },
        sidebar: "Looking for Support Team consultant information then you've come to the right place!",
        agents: [{
            name: 'Owen Barford',
            role: 'Senior Technical Advisor - Support',
            address: 'Kingston upon Thames, KT2 6SR',
            products: ['Taxation', 'Accounts', 'Technical Services'],
            team: 'Back Office',
        },
        {
            name: 'Kitty Cheung',
            role: 'Team Leader - Accounts & PM',
            address: 'Kingston upon Thames, KT2 6SR',
            products: ['Accounts'],
            team: 'Accounts & Practice Management',            
        },
        {
            name: 'Ashfaq Shah',
            role: 'Team Leader - Technical Services',
            address: 'Home Worker',
            products: ['Technical Services'],
            team: 'Installations',
        },
        {
            name: 'Mark Gionis',
            role: 'Team Leader - Taxation & DM',
            address: 'Kingston upon Thames, KT2 6SR',
            products: ['Taxation'],
            team: 'Taxation & Document Management',
        },
        {
            name: 'Tony Oliver',
            role: 'Head of Support',
            address: 'Kingston upon Thames, KT2 6SR',
            products: ['N/A'],
            team: 'N/A',            
        },
        {
            name: 'Alan Titcombe',
            role: 'Manager - Document & Web Operations',
            address: 'Home Worker',
            products: ['N/A'],
            team: 'Documentation & Web Operations',
        },
        {
            name: 'Stuart Miles',
            role: 'Webmaster',
            address: 'Kingston upon Thames, KT2 6SR',
            products: ['N/A'],
            team: 'Documentation & Web Operations',
        }] 
    }); 
}; 
 
/* GET 'Agent info' page */
const agentInfo = function(req, res){
    res.render('agent-info', { 
        title: 'Owen Barford',
        pageHeader: {
            title: 'Owen Barford'
        },
        sidebar: {
            context: 'is listed in SupportApp because he works for the Support Team.'            
        },
        agent: {
            name: 'Owen Barford',
            role: 'Senior Technical Advisor - Support',
            roleDesc: 'Technical advisor for all environmental type queries across the Support Team. Keeper of the System Requirements Specification. BI Expert.',
            address: 'Kingston upon Thames, KT2 6SR',
            products: ['Taxation', 'Accounts', 'Technical Services'],
            team: 'Back Office',
            workingTimes: [{
                days: 'Monday - Friday',
                start: '8:30am',
                end: '4:30pm',
                closed: false
            }, {
                days: 'Saturday',
                closed: true
            }, {
                days: 'Sunday',
                closed: true
            }]
        }
    }); 
}; 

module.exports = {   
    homelist,
    agentInfo    
}; 