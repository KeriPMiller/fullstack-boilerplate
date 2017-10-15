# Model Example

Thanks, @bizdevchristian!

```javascript

const IncredibleHulk = db.define('IncredibleHulk', {
    birthName: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Bruce Banner"
      validate: {
        notEmpty: true
      }
    },
    isGreen: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    nextDateWithBettyRoss: {
      type: Sequelize.DATE,
      defaultValue: null
    }
  }, {
      getterMethods: {
        currentPersona: function () {
          return (this.isGreen ? "The Incredible Hulk" : this.birthName)
        },
        strengthLevel: function () {
          return (this.isGreen ? "Over 9000" : "Scrawny Beanpole")
        }
      },
      hooks: {
        beforeDestroy: function() {
          this.isGreen = false
        }
      }
});

// class method example
IncredibleHulk.ArmyOfHulks = function () {
  return IncredibleHulk.update({ isGreen: true },
    { where: { complete: false } })
  }

//instance method examples
IncredibleHulk.prototype.addChild = function (nameObject) {
  sexyTimeWithBettyRoss();
  setTimeout(function(){
    alert("Hey bay-bay, hey bay-bay, hey");
    return IncredibleHulk.create({
      name: this.name + "Jr.",
      parentId: this.id })
  }, 23670000);
}

IncredibleHulk.prototype.getChildren = function () {
  return IncredibleHulk.findAll({ where: { parentId: this.id } })
}

//association example
IncredibleHulk.belongsTo(Avengers);
// Will add an avengersId attribute to IncredibleHulk
// to hold the primary key value for Avengers
```
