/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OmitType } from '@nestjs/swagger';
import { CompanyAmqpDto } from './company-amqp.dto';

export class CreateCompanyAmqpDto extends OmitType(CompanyAmqpDto, ['id'] as const) {}
