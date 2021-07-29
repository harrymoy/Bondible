const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BondFactory", function () {

  let factory;
  let bondOwner;
  let address1;

  beforeEach(async () => {
    const [owner, addr1] = await ethers.getSigners();
    const daiInstance = await ethers.getContractFactory("Dai");
    const dai = await daiInstance.deploy("5777");
    const BondFactory = await ethers.getContractFactory("BondFactory");
    const bondFactory = await BondFactory.connect(owner).deploy(dai.address);
    factory = bondFactory;
    bondOwner = owner;
    address1 = addr1;
  });

  it("Check that the bond deployed at id 1 is read correctly", async function () {
    const bond = await factory.issueBond("1", "1000");
    const retrievedBond = await factory.getBondAddress(1);
    console.log(bond);
    console.log(retrievedBond);
    expect(bond == retrievedBond);
  });

  it("Subscribe to the bond", async function() {
    await factory.connect(address1).subscribeToBond("1", "100");
  });

  it("Get the current balance of the bond", async function () {
    console.log(bondOwner);
    await factory.connect(bondOwner).closeBond(1);
    const balance = await factory.connect(bondOwner).changeMaxSubscription(1, "2000");
    console.log(balance);
    expect(balance.to.eq(2000));
  });
});
