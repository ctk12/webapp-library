export function validatePassword(password: string) {
    if (!(/[a-z]/).test(password)) {
        return false;
    } else if (!(/[0-9]/).test(password)) {
        return false;
    } else if (!(/[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/).test(password)) {
        return false;
    } else {
        return true;
    }
}


export interface AuthResponseType {
    success: boolean;
    message: string;
    data?: object;
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function authResponse(data: AuthResponseType) {
    return { success: data.success, message: data.message };
}

export const getObjtoArray = <T extends object>(data: T) => {
    const newArray = [];
    const entries = Object.entries(data);

    for (const [key, value] of entries) {
      newArray.push([key, value]);
    }
    return newArray;
}

export const isDataChanged = (data1: string[], data2: string[]) => {
    for (let i = 0; i < data1.length; i++) {
      if (data1[i] !== data2[i]) {
        return true;
      }
    }
    return false;
}