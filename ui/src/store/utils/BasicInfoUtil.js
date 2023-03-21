export const saveSwaggerInfoProperty = (swagger, field, value) => {
    swagger = swagger.set(field, value);
    return swagger;
}

export const saveBasicInfoProperty = (info, field, value) => {
    info = info.set(field, value);
    return info;
}

export const saveContactProperty = (contact, field, value) => {
    if (field === 'email') {
        let emailValue = value && value.length > 0 ? value.join(',') : value[0];
        contact = contact.set(field, emailValue);
    }
    else {
        contact = contact.set(field, value);
    }
    return contact;
}

export const saveLicenseProperty = (license, field, value) => {           
    license = license.set(field, value);
    return license;
}