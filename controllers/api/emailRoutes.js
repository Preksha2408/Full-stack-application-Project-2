const router = require('express').Router();
const { CronJob } = require('cron');
const cron = require('cron')
const axios = require('axios')
const { Task, User } = require('../../models');
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')

const sendEmails = () => {
    return
}

const job = CronJob.from({
    cronTime: cron.sendAt('00 00 00 * * *'),
    onTick: sendEmails(),
    start: true,
    timeZone: 'UTC-5'
})



console.log(`The email function will run at ${job.cronTime}`);

// const run = () => {

//     const today = dayjs()
//     const tomorrow = today.add(1, 'day');
//     console.log(tomorrow)
    
// }

// run();

//REST API request to send emails
router.post('/', async (req, res) => {
    try {
        const dueEmailData = {
            service_id: 'service_ojacxn7',
            template_id: 'template_fq9gwkf',
            user_id: process.env.EMAIL_KEY, 
            template_params: dueTemplParams
        };
        
        axios({
            method: 'post',
            url: 'https://api.emailjs.com/api/v1.0/email/send',
            data: dueEmailData
          })
          .then(function (response) {
           res.json('success');
          })
          .catch(function (error) {
            console.log(error);
          });
        
    } catch(err) {
        console.log(err)
    }

    try {
        // const dueArray = dueEmails();
        const overdueArray = [{to_name: 'H', to_email:'jpmankovich@gmail.com'}, {to_name:'K', to_email:'jpmankovich@gmail.com'}]
        overdueArray.forEach((email) => {
            sendOverdueEmails(email)
        })
        

        
    } catch(err) {
        console.log(err)
    }
});

// const emails = async () => {
//     try{
//         await filterTasks()
//         .then(getEmails(dueTasks, overdueTasks))
//         .then(getNames(dueEmails, overdueEmails))
//         .then(sendEmails(dueTemplParams, overdueTemplParams));

//     } catch {(err) => {
//         console.log(err);
//         res.status(400).json(err)
//     }}
// }

const sendOverdueEmails = async (overdueTemplParams) => {
    const overdueEmailData = {
        service_id: 'service_ojacxn7',
        template_id: 'template_fywne69',
        user_id: process.env.EMAIL_KEY, 
        template_params: overdueTemplParams
    };
    
    axios({
        method: 'post',
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        data: overdueEmailData
      })
      .then(function (response) {
       res.json('success');
      })
      .catch(function (error) {
        console.log(error);
      });
}

const dueTemplParams = {
    to_name: 'J',
    to_email: "jpmankovich@gmail.com",
}

// const overdueTemplParams = {
//     to_name: "J",
//     to_email: "jpmankovich@gmail.com",
// }



//filter all tasks for those with a due date either the next day or the day before
//FIXME: does this need to be in taskRoutes?



// const getDueTasks = aysnc () => {

//     try {
//         const today = dayjs()
//         const tomorrow = today.add(1, 'day');
        
//         const { dueTasks } = await Task.findAll({
//             where: {
//                 task_due: tomorrow,
//             },
//             include: [ {model: User} ]
//         })
//         console.log(dueTasks)
        
//         // const { emailsObj } = Object.groupBy(dueTasks, ({ email }) => email);
        
//         // console.log(emailsObj)
        
        
//         return dueTasks;
        
//     } catch {(err) => {
//         console.log(err);
//         res.status(400).json(err)
//     }}
// }

// try {
//     const overdueTasks = await Task.findAll({
//         where: {
//             dueDate: (dayjs().toNow(true) > d && dayjs().toNow,
//         },
//         include: [ {model: User} ]
//     })
//     console.log(overdueTasks);
//     return overdueTasks

// } catch {(err) => {
//     console.log(err);
//     res.status(400).json(err)
// }} 



//filter responsive tasks for those belonging to the same user email and return an array of those email addresses so that each user only gets one email

// async function getEmails (dueTasks, overdueTasks) {
//     try {
//         const emailsObj = await Object.groupBy(dueTasks, ({ email }) => email);
//         console.log(emailsObj);
//         const dueEmails = await Object.keys(emailsObj);
//         console.log(dueEmails)
//         return dueEmails;

//     } catch {(err) => {
//         console.log(err);
//         res.status(400).json(err)
//     }};

//     try {
//         const emailsObj = await Object.groupBy(overdueTasks, ({ email }) => email);
//         console.log(emailsObj);
//         const overdueEmails = await Object.keys(emailsObj);
//         console.log(overdueEmails)
//         return overdueEmails;

//     } catch {(err) => {
//         console.log(err);
//         res.status(400).json(err)
//     }};
// }

// //get the User objects for each email address receiving an email notification to get the names of the users receiving the emails
// async function getUsers(dueEmails, overdueEmails) {
//     try {
//         const dueUsers = await dueEmails.forEach((dueEmail) => User.findAll({
//             where: {
//                 email: dueEmail,
//             }
//         }));
//         console.log(dueUsers)
//         return dueUsers;

//     } catch {(err) => {
//         console.log(err);
//         res.status(400).json(err)
//     }};

//     try {
//         const overdueUsers = await overdueEmails.forEach((overdueEmail) => User.findAll({
//             where: {
//                 email: overdueEmail,
//             }
//         }));
//         console.log(overdueUsers)
//         return overdueUsers;

//     } catch {(err) => {
//         console.log(err);
//         res.status(400).json(err)
//     }};
// }

// const dueTemplParams = {
//     to_name: dueUsers.username,
//     to_email: dueUsers.email,
// }

// const overdueTemplParams = {
//     to_name: overdueUsers.username,
//     to_email: overdueUsers.email,
// }

// getEmails()

module.exports = router;

