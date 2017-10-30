/**
 *
 * @param url
 * @param params
 * @returns {Promise.<*>}
 */

export async function fetchJSON(url, params = {}) {

  const {
    method = 'GET',
    body,
  } = params;

  let responseJSON = null;

  try {
    let response = await fetch(url, {
      body: JSON.stringify(body),
      method,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
    return await response.json();
  } catch(error) {
    console.error('Вот это вот пошло не так: ', error);
  }
}


/**
 * Конвертирует строку типа "2016, 9, 2" в объект Date
 * @param string
 * @returns {Date}
 */
export function createDateFromString(string) {
  const stringArr = string.replace(/ +/g, '').split(',');
  return new Date(
    +stringArr[0],
    +stringArr[1] - 1,
    +stringArr[2]
  );
}