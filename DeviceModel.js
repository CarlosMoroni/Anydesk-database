class Device {
    constructor(deviceObject = {}) {
        this.id = deviceObject.id;
        this.name_device = deviceObject.name_device;
        this.access_code = deviceObject.access_code;
        this.department = deviceObject.department;
        this.category = deviceObject.category;
    }
}