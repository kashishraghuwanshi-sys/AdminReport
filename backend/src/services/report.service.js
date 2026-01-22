
// import { pool } from "../config/db.js";

// export const fetchAdminReport = async (
//   fromDate,
//   toDate,
//   groupBy = "month",
//   type
// ) => {
//   /* ============================
//      SUMMARY QUERIES
//   ============================ */

//   const usersQuery = `
//     SELECT 
//       COUNT(*) AS total_users,
//       COUNT(*) FILTER (WHERE status::text = 'Approve')     AS approved_users,
//       COUNT(*) FILTER (WHERE status::text = 'On Hold')     AS hold_users,
//       COUNT(*) FILTER (WHERE status::text = 'Deactivate') AS deactivated_users
//     FROM users
//     WHERE created_at BETWEEN $1 AND $2
//   `;

//   const subscriptionsQuery = `
//     SELECT 
//       COUNT(*) AS total_subscriptions,
//       COUNT(*) FILTER (WHERE status::text = 'Approve') AS active_subscriptions
//     FROM subscriptions
//     WHERE created_at BETWEEN $1 AND $2
//   `;

//   const messagesQuery = `
//     SELECT COUNT(*) AS total_messages
//     FROM messages
//     WHERE created_at BETWEEN $1 AND $2
//   `;

//   const usageQuery = `
//     SELECT 
//       COALESCE(SUM(video_call_used), 0)     AS video_calls,
//       COALESCE(SUM(audio_call_used), 0)     AS audio_calls,
//       COALESCE(SUM(people_message_used), 0) AS messages_used
//     FROM user_plans
//     WHERE created_at BETWEEN $1 AND $2
//   `;

//   /* ============================
//      TIMELINE QUERIES
//   ============================ */

//   const usersTimeSeriesQuery = `
//     SELECT
//       (DATE_TRUNC($3, created_at)::date)::text AS period,
//       COUNT(*) AS total_users
//     FROM users
//     WHERE created_at BETWEEN $1 AND $2
//     GROUP BY DATE_TRUNC($3, created_at)
//     ORDER BY DATE_TRUNC($3, created_at)
//   `;

//   const messagesTimeSeriesQuery = `
//     SELECT
//       (DATE_TRUNC($3, created_at)::date)::text AS period,
//       COUNT(*) AS total_messages
//     FROM messages
//     WHERE created_at BETWEEN $1 AND $2
//     GROUP BY DATE_TRUNC($3, created_at)
//     ORDER BY DATE_TRUNC($3, created_at)
//   `;

//   const planSeriesQuery = `
//     SELECT
//       (DATE_TRUNC($3, created_at)::date)::text AS period,
//       plan_name,
//       COUNT(*) AS count
//     FROM subscriptions
//     WHERE created_at BETWEEN $1 AND $2
//     GROUP BY DATE_TRUNC($3, created_at), plan_name
//     ORDER BY DATE_TRUNC($3, created_at)
//   `;

//   /* ============================
//      🔥 USER + PLAN + PAYMENT DETAILS
//   ============================ */

// const userPlanPaymentQuery = `
//   SELECT
//     u.id AS user_id,

//     COALESCE(p.first_name, 'N/A') AS user_name,
//     u.email,

//     s.plan_name,
//     s.status AS plan_status,
//     s.created_at AS plan_purchase_date,

//     pay.amount,
//     pay.currency,
//     pay.status AS payment_status,
//     pay.created_at AS payment_date

//   FROM users u

//   LEFT JOIN profiles p 
//     ON p.user_id = u.id

//   LEFT JOIN subscriptions s 
//     ON s.user_id = u.id

//   LEFT JOIN payments pay 
//     ON pay.user_id = u.id
//    AND pay.plan_id = s.plan_id

//   WHERE s.created_at BETWEEN $1 AND $2

//   ORDER BY s.created_at DESC
// `;

// const allUsersQuery = `
//   SELECT
//     u.id,
//     p.first_name || ' ' || p.last_name AS name,
//     u.email,
//     p.age,
//     p.profession,
//     u.status
//   FROM users u
//   LEFT JOIN profiles p ON p.user_id = u.id
//   WHERE u.created_at BETWEEN $1 AND $2
// `;

// const approvedUsersQuery = `
//   SELECT
//     u.id,
//     p.first_name || ' ' || p.last_name AS name,
//     u.email,
//     p.age,
//     p.profession
//   FROM users u
//   LEFT JOIN profiles p ON p.user_id = u.id
//   WHERE u.status::text = 'Approve'
//     AND u.created_at BETWEEN $1 AND $2
// `;

// const holdUsersQuery = `
//   SELECT
//     u.id,
//     p.first_name || ' ' || p.last_name AS name,
//     u.email,
//     p.age,
//     p.profession
//   FROM users u
//   LEFT JOIN profiles p ON p.user_id = u.id
//   WHERE u.status::text = 'On Hold'
//     AND u.created_at BETWEEN $1 AND $2
// `;

// const subscriptionsListQuery = `
//   SELECT
//     u.email,
//     p.first_name AS name,
//     s.plan_name,
//     s.status,
//     s.created_at AS purchase_date,
//     s.expires_at
//   FROM subscriptions s
//   JOIN users u ON u.id = s.user_id
//   LEFT JOIN profiles p ON p.user_id = u.id
//   WHERE s.created_at BETWEEN $1 AND $2
//   ORDER BY s.created_at DESC
// `;

//   /* ============================
//      EXECUTION
//   ============================ */

//   const [
//     usersResult,
//     subscriptionsResult,
//     messagesResult,
//     usageResult,
//     usersSeriesResult,
//     messagesSeriesResult,
//     planSeriesResult,
//     userPlanPaymentResult
//   ] = await Promise.all([
//     pool.query(usersQuery, [fromDate, toDate]),
//     pool.query(subscriptionsQuery, [fromDate, toDate]),
//     pool.query(messagesQuery, [fromDate, toDate]),
//     pool.query(usageQuery, [fromDate, toDate]),
//     pool.query(usersTimeSeriesQuery, [fromDate, toDate, groupBy]),
//     pool.query(messagesTimeSeriesQuery, [fromDate, toDate, groupBy]),
//     pool.query(planSeriesQuery, [fromDate, toDate, groupBy]),
//     pool.query(userPlanPaymentQuery, [fromDate, toDate])
//   ]);

//   let detailedList = [];

//   if (type === "users") {
//     detailedList = (await pool.query(allUsersQuery, [fromDate, toDate])).rows;
//   }

//   if (type === "approved") {
//     detailedList = (await pool.query(approvedUsersQuery, [fromDate, toDate])).rows;
//   }

//   if (type === "hold") {
//     detailedList = (await pool.query(holdUsersQuery, [fromDate, toDate])).rows;
//   }

//   if (type === "subscriptions") {
//     detailedList = (await pool.query(subscriptionsListQuery, [fromDate, toDate])).rows;
//   }

//   /* ============================
//      FINAL RESPONSE
//   ============================ */

//   return {
//     summary: {
//       users: usersResult.rows[0],
//       subscriptions: subscriptionsResult.rows[0],
//       messages: messagesResult.rows[0],
//       usage: usageResult.rows[0]
//     },
//     timeline: {
//       users: usersSeriesResult.rows,
//       messages: messagesSeriesResult.rows,
//       plans: planSeriesResult.rows
//     },
//     users_activity: userPlanPaymentResult.rows
//   };
// };



import { pool } from "../config/db.js";

export const fetchAdminReport = async (fromDate, toDate, groupBy = "month") => {

  const usersQuery = `
    SELECT 
      COUNT(*) AS total_users,
      COUNT(*) FILTER (WHERE status = 'Approve') AS approved_users,
      COUNT(*) FILTER (WHERE status = 'On Hold') AS hold_users,
      COUNT(*) FILTER (WHERE status::text = 'In Process')  AS in_process_users,
      COUNT(*) FILTER (WHERE status = 'Deactivate') AS deactivated_users
    FROM users
    WHERE created_at BETWEEN $1 AND $2
  `;

  const messagesQuery = `
    SELECT COUNT(*) AS total_messages
    FROM messages
    WHERE created_at BETWEEN $1 AND $2
  `;

  const subscriptionsQuery = `
    SELECT COUNT(*) AS total_subscriptions
    FROM subscriptions
    WHERE created_at BETWEEN $1 AND $2
  `;

  const usersTimelineQuery = `
    SELECT 
      DATE_TRUNC($3, created_at)::date AS period,
      COUNT(*) AS total_users
    FROM users
    WHERE created_at BETWEEN $1 AND $2
    GROUP BY period
    ORDER BY period
  `;

  const messagesTimelineQuery = `
    SELECT 
      DATE_TRUNC($3, created_at)::date AS period,
      COUNT(*) AS total_messages
    FROM messages
    WHERE created_at BETWEEN $1 AND $2
    GROUP BY period
    ORDER BY period
  `;

  const plansTimelineQuery = `
    SELECT
      DATE_TRUNC($3, created_at)::date AS period,
      plan_name,
      COUNT(*) AS count
    FROM subscriptions
    WHERE created_at BETWEEN $1 AND $2
    GROUP BY period, plan_name
  `;

  const paymentsQuery = `
    SELECT
      u.id AS user_id,
      COALESCE(p.first_name, 'N/A') AS user_name,
      u.email,
      s.plan_name,
      s.status AS plan_status,
      s.created_at AS plan_purchase_date,
      pay.amount,
      pay.currency,
      pay.status AS payment_status,
      pay.created_at AS payment_date
    FROM subscriptions s
    JOIN users u ON u.id = s.user_id
    LEFT JOIN profiles p ON p.user_id = u.id
    LEFT JOIN payments pay ON pay.user_id = u.id
    WHERE s.created_at BETWEEN $1 AND $2
    ORDER BY s.created_at DESC
  `;

  const [
    users,
    messages,
    subscriptions,
    usersTimeline,
    messagesTimeline,
    plansTimeline,
    payments
  ] = await Promise.all([
    pool.query(usersQuery, [fromDate, toDate]),
    pool.query(messagesQuery, [fromDate, toDate]),
    pool.query(subscriptionsQuery, [fromDate, toDate]),
    pool.query(usersTimelineQuery, [fromDate, toDate, groupBy]),
    pool.query(messagesTimelineQuery, [fromDate, toDate, groupBy]),
    pool.query(plansTimelineQuery, [fromDate, toDate, groupBy]),
    pool.query(paymentsQuery, [fromDate, toDate])
  ]);

  return {
    summary: {
      users: users.rows[0],
      messages: messages.rows[0],
      subscriptions: subscriptions.rows[0]
    },
    timeline: {
      users: usersTimeline.rows,
      messages: messagesTimeline.rows,
      plans: plansTimeline.rows
    },
    users_activity: payments.rows
  };
};
