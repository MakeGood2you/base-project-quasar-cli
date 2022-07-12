
Storage.prototype.has = function(key) {
  return !!this.getItem(key)
}

Storage.prototype.set = function(key, value) {
  this.setItem(key, JSON.stringify(value))
}

Storage.prototype.get = function(key) {
  return JSON.parse(this.getItem(key))
}

Storage.prototype.update = function(key, obj) {
  this.setItem(key, JSON.stringify(Object.assign(JSON.parse(this.getItem(key)), obj)))
}

Storage.prototype.remove = function(key) {
  this.removeItem(key)
}

Storage.prototype.destroy = function() {
  this.clear()
}
