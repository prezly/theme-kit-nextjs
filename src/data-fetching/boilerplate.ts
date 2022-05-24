import type { NewsroomCompanyInformation } from '@prezly/sdk';

export function hasAnySocialMedia(companyInformation: NewsroomCompanyInformation): boolean {
    return Boolean(
        companyInformation.facebook ||
            companyInformation.instagram ||
            companyInformation.linkedin ||
            companyInformation.pinterest ||
            companyInformation.tiktok ||
            companyInformation.twitter ||
            companyInformation.youtube,
    );
}

export function hasAnyAboutInformation(companyInformation: NewsroomCompanyInformation): boolean {
    return Boolean(
        companyInformation.about ||
            companyInformation.website ||
            hasAnySocialMedia(companyInformation),
    );
}

export function hasAnyContactInformation(companyInformation: NewsroomCompanyInformation): boolean {
    return Boolean(
        companyInformation.address || companyInformation.phone || companyInformation.email,
    );
}
