export default class Validate {
  static isEmail(value: string): boolean {
    return !!value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  }

  static isFilled(value: string): boolean {
    return value.length > 0;
  }

  static isPassword(value: string): boolean {
    return value.length >= 6;
  }

  static isNotEmpty(value: string): boolean {
    return value !== null && value !== undefined && value.length > 0;
  }

  static isEmpty(value: string): boolean {
    return value.length === 0;
  }

  static isPhone(value: string): boolean {
    return !!value.match(/^(\s)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
  }

  static isConfirmPssword(password: string, confirmPassword: string): boolean {
    return (
      Validate.isPassword(confirmPassword)
      && Validate.isPassword(password)
      && password === confirmPassword
    );
  }

  static isNotEqualPasswords(password: string, newPassword: string): boolean {
    return (
      Validate.isPassword(newPassword)
      && Validate.isPassword(password)
      && password !== newPassword
    );
  }
}
