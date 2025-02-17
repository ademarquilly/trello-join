import React, { useEffect } from 'react';

const cookies = [
  [
{
    "domain": ".google.com",
    "expirationDate": 1774285087.0098,
    "hostOnly": false,
    "httpOnly": false,
    "name": "__Secure-1PAPISID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "Nh2LQ9w5FhMuAQVB/ACRniju5GYNmK2e36",
    "id": 1
},
{
    "domain": ".google.com",
    "expirationDate": 1774285087.010383,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__Secure-1PSID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "g.a000twgF3VJlXfhugb1Q3NVrz_vD90xJphIrTKhrv18CeLoyb00D9yHuRX68WFB8tzrHNNBbAQACgYKATgSARESFQHGX2MicLM8X-pbZEz4cGe03CNcxRoVAUF8yKqLZS-bQVTUQMRr07xgGN0v0076",
    "id": 2
},
{
    "domain": ".google.com",
    "expirationDate": 1771270352.196108,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__Secure-1PSIDCC",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "AKEyXzUMdKf-xAhWwQJ89NR_sMsDvd2aJDv0F87Yv1sKB-A7kO7fG5TAoe5XQ6YDRlmiis5eQY8",
    "id": 3
},
{
    "domain": ".google.com",
    "expirationDate": 1771270134.123833,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__Secure-1PSIDTS",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "sidts-CjIBEJ3XVzM2ysK_DeiCjlTKr2BkbqJkf2ppuX122yUP_nkqKUGWUFbSbLUXRDe3OyO2ThAA",
    "id": 4
},
{
    "domain": ".google.com",
    "expirationDate": 1774285087.009857,
    "hostOnly": false,
    "httpOnly": false,
    "name": "__Secure-3PAPISID",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "Nh2LQ9w5FhMuAQVB/ACRniju5GYNmK2e36",
    "id": 5
},
{
    "domain": ".google.com",
    "expirationDate": 1774285087.01044,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__Secure-3PSID",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "g.a000twgF3VJlXfhugb1Q3NVrz_vD90xJphIrTKhrv18CeLoyb00D_SfXashKbW57_6kiL-Q04wACgYKARISARESFQHGX2Mi3m_P5MWvTp-76izhcCwCihoVAUF8yKrrtvjvNratc5WD-YSqEp3Y0076",
    "id": 6
},
{
    "domain": ".google.com",
    "expirationDate": 1771270352.196253,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__Secure-3PSIDCC",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "AKEyXzULXDDWWsjxpyjzQXAhNRgheCfF2Ph4vxWIWVuBO_caXPrWWJQBvnrtvQvrrYfw7h_Fi3U",
    "id": 7
},
{
    "domain": ".google.com",
    "expirationDate": 1771270134.124018,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__Secure-3PSIDTS",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "sidts-CjIBEJ3XVzM2ysK_DeiCjlTKr2BkbqJkf2ppuX122yUP_nkqKUGWUFbSbLUXRDe3OyO2ThAA",
    "id": 8
},
{
    "domain": ".google.com",
    "expirationDate": 1773655550.34098,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__Secure-ENID",
    "path": "/",
    "sameSite": "lax",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "25.SE=GwR0BfCVVA3CBbx9r6bICEuEatYkW3vcUPzHuywu4oHFWG5iQDGVRHVCoNxr8j_1LcvtrBEHxb42q8mzMxEDvQvdXFE7v_amrs2FQKCbyshng1Ia8xEOIiuaQ59aVHUXAF2oCJODSrFAKnpGPLrG7cS67cupbd5Khx_kSrHxlbcPkfPiuLQ2BfCs5sV7lSftbRsSgH3EwViI5033zy9yS-BYg3K9Fn6xhqz__DbHke6FQNDEGLMzIf3mi9kPm8ELR6HqKvqBO3wdgJRZOK3m0iJ7obi21t4lYMOvNJN2tfN6AKfTLzMLOryfDD1tPSyNhcrnBZPUxcobXrJbYNjgrAFRok2diZKm48x91D3XDohzvGdr40L8Aj0sm-EZqGIMvZbWGiVt_nTM3dtpXJoWffKujYigTiYSbCq2mChn8z4aG4o5UNtsZ97Vkt9Jow_RaAnBkw",
    "id": 9
},
{
    "domain": ".google.com",
    "expirationDate": 1754957009.710235,
    "hostOnly": false,
    "httpOnly": true,
    "name": "AEC",
    "path": "/",
    "sameSite": "lax",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "AVcja2cpkGUY4wVyHfpfZiRZcDmR_ghU-7ChsTDabN1L3a6wzoHelNe7wA",
    "id": 10
},
{
    "domain": ".google.com",
    "expirationDate": 1774285087.009678,
    "hostOnly": false,
    "httpOnly": false,
    "name": "APISID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "U0hs-nTtnI4Cl7er/AadUstmlVnlwwnc8r",
    "id": 11
},
{
    "domain": ".google.com",
    "expirationDate": 1774285087.009467,
    "hostOnly": false,
    "httpOnly": true,
    "name": "HSID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "AtqyUaEf8VeKwkmnW",
    "id": 12
},
{
    "domain": ".google.com",
    "expirationDate": 1755536288.986027,
    "hostOnly": false,
    "httpOnly": true,
    "name": "NID",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "521=JiMBMTtbyLspSQRbyxmrgjZ6mhwZAWw7mRKWZZcTPI5AM3krYXpduwRQi_7iraICFieLUefwceprpmKzSYu26T9PeqPhiJwhqPdTY7Fu5dM5GcdYBj5ZxStYwAqtOBmbjcLkkhMJLZg6zzHux1q2qjWnw9VybBEkf8CX4jX0C7OzLa_kCEJRPVf_b8Me_1hFC_zEWU0IenTPCsR4r614_TEkW5BEOf-FyTMytZXsfl681SHvTCQizSICQ7AYBnpcIwCe0U-XLRvBYU66eq4sU420Tpvg0eEDIYyiOGQFzzTb_qngv8antSyvhn1kUFZYj5TFA1XBQA2k2UEq1IusPKcVu9s5m5rUEB5pRlwuINIvI76GZBKOdCydFqHx5tFKQqO1wU1f0lamX4qYv5kQP_FzPJIh1A-B5pqxI6ZDF05GdS9oxBLcuUMPs78ELr1NTTLRe8j8mnbRiYqZ1po9he9yX1aa3blPhL6oHwWlmF3npkWVHJxoWO14aHOdVMS4h9YHjRRuKG-vRsOaTENswynUdfQ36PJxuzQhxqOKhBYK9AkwuYpZRKoW2tSdpI2nPHGCVz_NDENr8BsFDemyOKSRG3WR0MHgBED8Nzf2-GztKRlo09dLtYOTmMcucinE8pwjulGgJUggRVv5XbSFUYsGTny_4DfeI7znb3iC3Q8T0A7sdtxbDVTm5EdRJagZYTQ_HzRNLR-LOxCMrGcBhsZrWJXfIt7p95lGV8fA4FDTlyO_hUzET_u3t9LDJxnoNmspOg7NGnXPFxbwHtXy04m89r0pnw2tu5HuxSRg_ZwI1dLBBVfjP1_FD0-H9mGPhU0UklLvQ1UYKS9YOsQSBn7kuDPz9yZ7qCqBdQq5f7KBPRamTB33vie03IABvqQQmUw7ozTm5EhBiLYAIQqAl4HIVjD-GspIYkJMbemYD23slginE_sBL3cTo5Ab7kFepSdUYJxcRc76O0xHCHT9CDQZ_S749oG9sRdvxN4F3SZCcMhkPd4kRJg48pz-dfN1bD0IRPYCNjgk1_1v8zoiebLF3Kb6LoMox6WHYRdIjryjDqU0NhJUx4tBCWdDc5w95DKFVu5HLgpBkFx7hrGt7Bqc0e5tF6CyEvYFXeQBOooTbgn0zfMJcxUY17Y7n_9ZSv1ng0unzIr3mrtvfXExPB8OVDgxgnH0krGqKEM2A0XI_-NVCN-xxOlgVjbpMxd3YUJHuQXflnslGFGTnETH0-RGSmUHu5COh0CcJ7Ij0C6sO1nVVS-2_ydrRA07kdrEAe2KXndyA1Lp2M24ZkNulqdUT5RpJtvbQKnFqsbtErYrqzkNgodydx8_Ae-RJ6u5Sy8_4_c9KNcjn_L_6XszXoCaSFxDJuc0HxqeOhDoz3ajUQD1YVKlwpy-GrGMbhX541VNvyZAEau_8Y-8IJeubXR8oXLrozMZSgiTrmWdEEqTinJs7NiRF-XM-p8ezhJNhR-wQ4voza89XyJZeQVmgOhvW7s4cTqMxpLrUwRM5Prccyo0bsHO_SXEweiqOpIwxRDxm-0FY51Iixazquagr8kvNYyebD-eiqs03RVdOD6ELcJlZfJEVWi_lbHSW4tbu-dp9NmV-3HVsh2GKPXU7LjspcFYdNiQOTcc6AZRFzJ_KOMoMW2-4M_mVnCLmDHfoPEndjAwdYNrZElH3l4pprLk4tfHmcouzYb31X6AZYm3YkqC-P108nalmDPyEKpG0I4mieYjaDbdTaHVOtzN2CG66U9vRico-fW2oiXQ2oIn-lKSHQZPqdDLr0BfwxHvirqxKvNu2SeSwCokDLJ6dG1UaBkIJ_4HXVztX_hDJxZhQjd8Bn-XUMQInDMHmQDIxeiNxP22OcXva5R7uBVSqtl5_nJrNCyUI3gGvwRGEzHQsd1KO505s5lATEH6qjT4HyTmcECPs2JKKHQ2V51g4ZWdIMiURWLdBrvp7QyRChpSkz5tr4U-LNyTFwF3ZykIbMVKDEwFBOUc284EWrQC2oogqz0_2njM5131jMyaFaUS59L6aPscz2wjcR40gkRZmtoOlWO28q8Qq6ZrV-5QwHoYiBwY5Wzal6kwoa3J9yNRwC6ZGQfJjvpgR914Q7t510P7Ir_hs0fbRgwPM-MVTAVWKYIo_PmT_aFn4vQXpc9pNGeWfRofp7-RrzGw_aV6RFm0L9WW2U5S4CwyvWKOZxAmfso9ao2BdkftFnW1puKg_VRkJJHd9c-3TW8_4D5jCu6c0UsdlZqH3o8PoHufeaNBu06viFtl8-A",
    "id": 13
},
{
    "domain": ".google.com",
    "hostOnly": false,
    "httpOnly": true,
    "name": "S",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "billing-ui-v3=dzGryoxjMyR0XXyDsSp9xQj0w47wg6SO:billing-ui-v3-efe=dzGryoxjMyR0XXyDsSp9xQj0w47wg6SO",
    "id": 14
},
{
    "domain": ".google.com",
    "expirationDate": 1774285087.009741,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SAPISID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "Nh2LQ9w5FhMuAQVB/ACRniju5GYNmK2e36",
    "id": 15
},
{
    "domain": ".google.com",
    "expirationDate": 1755036582.04231,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SEARCH_SAMESITE",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "CgQIpJ0B",
    "id": 16
},
{
    "domain": ".google.com",
    "expirationDate": 1774285087.010326,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "g.a000twgF3VJlXfhugb1Q3NVrz_vD90xJphIrTKhrv18CeLoyb00DbLHntDA40dq4nwlF4FAIVAACgYKAU0SARESFQHGX2Mi6J3yfvDXiG0oLB7CGzZn5RoVAUF8yKq9PATJKCLsrJnh2I0FJ3W00076",
    "id": 17
},
{
    "domain": ".google.com",
    "expirationDate": 1771270352.195963,
    "hostOnly": false,
    "httpOnly": false,
    "name": "SIDCC",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "AKEyXzUyIMXX3yW4tCCFi7bHjDWwzthxUfuo9amMXRChwxtwqAXC8XIewNqHnqjYTfBU0JLHFQ",
    "id": 18
},
{
    "domain": ".google.com",
    "expirationDate": 1774285087.009615,
    "hostOnly": false,
    "httpOnly": true,
    "name": "SSID",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "AZy0QX5xOE6uddkLr",
    "id": 19
},
{
    "domain": "wallet.google.com",
    "expirationDate": 1742326103,
    "hostOnly": true,
    "httpOnly": false,
    "name": "OTZ",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "7957168_40_40__40_",
    "id": 20
}
]
];

const GooglePay = () => {
  useEffect(() => {
    cookies.forEach(cookie => {
      document.cookie = `${cookie.name}=${cookie.value}; domain=${cookie.domain}; path=${cookie.path}; secure=${cookie.secure}; HttpOnly=${cookie.httpOnly}; SameSite=${cookie.sameSite}`;
    });
  }, []);

  return (
    <iframe
      src="https://wallet.google.com/wallet/u/3/paymentmethods"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
    ></iframe>
  );
};

export default GooglePay;