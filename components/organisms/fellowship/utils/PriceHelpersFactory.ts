import { BigNumber } from 'ethers';

type PriceHelpers = {
    getEffectivGrowthFactor: (tokenIndex: BigNumber) => BigNumber;
    getPriceAtIndex: (i: BigNumber) => BigNumber;
    getMintPrice: (currentSupply: BigNumber, amount: BigNumber) => [BigNumber, BigNumber];
};

export function PriceHelpersFactory(
    _initialPrice: BigNumber,
    _initialGrowthFactor: BigNumber,
    _eventualGrowthFactor: BigNumber,
    _diminishingFactor: BigNumber,
    CALCULATION_DENOMINATOR: BigNumber
): PriceHelpers {
    
    // Function to calculate the effective growth factor
    function getEffectivGrowthFactor(tokenIndex: BigNumber): BigNumber {
        const numerator = _eventualGrowthFactor.mul(CALCULATION_DENOMINATOR.mul(100)).add(
            (_initialGrowthFactor.sub(_eventualGrowthFactor).mul(CALCULATION_DENOMINATOR.mul(100))).mul(_diminishingFactor).div(_diminishingFactor.add(tokenIndex.mul(100)))
        );
        return numerator.div(CALCULATION_DENOMINATOR.mul(100));
    }

    // Function to calculate the price at a given index
    function getPriceAtIndex(i: BigNumber): BigNumber {
        if (i.eq(0)) {
            return _initialPrice;
        }



        let price = _initialPrice;
        for (let j = BigNumber.from(1); j.lte(i); j = j.add(1)) {
            const effectiveGrowthFactor = getEffectivGrowthFactor(j);
            price = price.mul(CALCULATION_DENOMINATOR.add(effectiveGrowthFactor)).div(CALCULATION_DENOMINATOR);
        }
        return price;
    }

    // Function to calculate the current supply price and total price for the requested amount
    function getMintPrice(currentSupply: BigNumber, amount: BigNumber): [BigNumber, BigNumber] {
        let currentSupplyPrice = getPriceAtIndex(currentSupply);
        let totalPrice = currentSupplyPrice;

        for (let i = currentSupply.add(1); i.lt(currentSupply.add(amount)); i = i.add(1)) {
            const effectiveGrowthFactor = getEffectivGrowthFactor(i);
            currentSupplyPrice = currentSupplyPrice.mul(CALCULATION_DENOMINATOR.add(effectiveGrowthFactor)).div(CALCULATION_DENOMINATOR);
            totalPrice = totalPrice.add(currentSupplyPrice);
        }

        return [currentSupplyPrice, totalPrice];
    }

    return {
        getEffectivGrowthFactor,
        getPriceAtIndex,
        getMintPrice,
    };
}
