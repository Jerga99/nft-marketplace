
const NftMarket = artifacts.require("NftMarket");

contract("NftMarket", accounts => {
  let _contract = null;

  before(async () => {
    _contract = await NftMarket.deployed();
    console.log(accounts);
  })

  describe("Mint token", () => {

    it("should resolve into true value", () => {
      let numberOfNfts = 12;
      assert(numberOfNfts == 12, "Value is NOT true");
    })
  })

})
