const NftMarket = artifacts.require("NftMarket");

module.exports = function (deployer) {
  deployer.deploy(NftMarket);
};
